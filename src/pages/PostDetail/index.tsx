import React, {
  TextareaHTMLAttributes,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { RouteComponentProps } from 'react-router';
import {
  PostWrapper,
  PostDetailWrapper,
  Interaction,
  ImageWrapper,
} from './style';
import {
  Avatar,
  Card,
  List,
  Input,
  Button,
  message,
  Image,
  Result,
} from 'antd';
import { connect, Link, Loading, useRequest } from 'umi';
import { PostModelState } from './model';
import {
  participantsRequest,
  applyRequest,
  getApplyStatus,
  getApplyList,
  changeApplySatus,
  addViewNum,
} from './service';
import { getUser, getUserId } from '@/utils/currentUser';
import style from '@/assets/gloabalStyle';
import { getUserStat } from '@/components/UserDetail/service';
import { PREFIX } from '@/utils/constants';
import { SmileOutlined } from '@ant-design/icons';
import { WSContext } from '../BasicLayout';
import { formatTime } from '@/utils/util';
interface PostDetail extends RouteComponentProps {
  post: PostModelState;
  loading: boolean;
  dispatch: Function;
}

const PostDetail: React.FC<PostDetail> = (props) => {
  const { Meta } = Card;
  const { TextArea } = Input;

  const { match, post, loading } = props;
  const { dispatch } = props;

  const [text, setText] = useState('');
  const [applyStatus, setApplyStatus] = useState(0);
  const [isAuthor, setIsAuthor] = useState(false);
  const [applyList, setApplyList] = useState();
  const [memberList, setMemberList] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [userStat, setUserStat] = useState();
  const images = useRef<any>(null);

  const ws = useContext(WSContext);

  useEffect(() => {
    const { id } = match.params as any;
    dispatch({
      type: 'post/getPostInfo',
      payload: {
        id,
      },
    });
  }, []);

  useEffect(() => {
    if (post.images)
      images.current = post.images
        ?.split('&')
        .map((item) => `${PREFIX}${item}`) as any[];
  }, [post]);

  // 浏览量+1
  useEffect(() => {
    const { id } = match.params as any;
    addViewNum(id);
  }, []);

  // 获取申请状态
  useEffect(() => {
    const currentId = getUserId() as string;
    const { id: postId } = match.params as any;
    const getStatus = async () => {
      const res = await getApplyStatus({ postId, applicantId: currentId });
      console.log(res);
      if (res.errno === 0) {
        const { is_accept } = res.data;
        console.log(is_accept);
        if (is_accept === 1) setApplyStatus(2);
        else if (is_accept === 0) setApplyStatus(1);
      } else {
        setApplyStatus(0);
      }
    };
    getStatus();
  }, []);

  // 判断作者是不是本人
  useEffect(() => {
    const userId = getUserId();
    const postAuthorId = post.user?.id;
    if (userId === postAuthorId) setIsAuthor(true);
  }, [post.user?.id]);

  // 获取申请名单
  useEffect(() => {
    const getApplyListAsync = async (postId: string) => {
      const res = await getApplyList({ postId });
      if (res.errno === 0) {
        const list = res.data;
        setApplyList(list.filter((item: any) => item.is_accept === 0));
        setMemberList(list.filter((item: any) => item.is_accept === 1));
      }
    };
    if (isAuthor) {
      getApplyListAsync(post.id);
    }
  }, [isAuthor, post.id, refresh]);

  const handleTextChange = (e: any) => {
    const value = e.target.value;
    setText(value);
  };

  const handleOfferHelp = async () => {
    const res = await applyRequest({
      applicantId: getUserId() as string,
      postId: post.id,
      text,
    });
    if (res.errno === 0) {
      message.success('申请已发送');
      setApplyStatus(1);
      console.log(post);
      const msg = {
        message: {
          type: 'text',
          content: text,
        },
        receiver: { id: post.user?.id },
        user: getUser(),
      };
      ws.emit('message', msg);
    } else {
      message.error('申请失败，清重试');
    }
  };

  const handleInteraction = async (action: string, requestId: string) => {
    const data = await changeApplySatus({
      action,
      requestId,
    });
    if (!data) {
      message.error('出错');
      return;
    }
    if (data[0] === 1) {
      message.success(`成功${action === 'approve' ? '批准' : '拒绝'}`);
      setRefresh(!refresh);
    }
  };

  const applyComponent = () => {
    let content;
    switch (applyStatus) {
      case 0:
        content = (
          <>
            <h1>请输入申请信息</h1>
            <TextArea
              allowClear
              autoSize={{ minRows: 3, maxRows: 5 }}
              onChange={(e: any) => handleTextChange(e)}
            />
            <Button style={{ marginTop: '20px' }} onClick={handleOfferHelp}>
              我要帮他
            </Button>
          </>
        );
        break;
      case 1:
        content = <h1>等待审核</h1>;
        break;
      case 2:
        content = <h1>审核通过，已经加入</h1>;
        break;
      case 3:
        content = <h1>请求被拒绝</h1>;
    }
    return content;
  };

  const ApplicantList = (
    <>
      {applyList == [] ? (
        <List header="还没有人申请"></List>
      ) : memberList.length < post.maxMembers ? (
        <List
          header="申请用户"
          itemLayout="horizontal"
          dataSource={applyList}
          style={{
            marginTop: '20px',
            // borderTop: `1px solid ${style['border-color']}`,
          }}
          renderItem={(item: any) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title={<a href="https://ant.design">{item.user.username}</a>}
                description={item.remark}
              />
              <Interaction>
                <i
                  className="iconfont approve"
                  onClick={() => handleInteraction('approve', item.id)}
                >
                  &#xe65b;
                </i>
                <i
                  className="iconfont reject"
                  onClick={() => handleInteraction('reject', item.id)}
                >
                  &#xe606;
                </i>
              </Interaction>
            </List.Item>
          )}
        ></List>
      ) : (
        <Result
          style={{ marginTop: 20 }}
          icon={<SmileOutlined style={{ color: style['theme-color'] }} />}
          title="已经满员"
        />
      )}
    </>
  );

  return (
    <PostWrapper>
      <Card
        className="post_detail"
        bordered={true}
        title={
          <Meta
            style={{ display: 'flex', alignItems: 'center' }}
            avatar={<Avatar src={`${PREFIX}${post.user?.avatar}`} />}
            title={post.user?.username}
            description={
              <>
                <span>发布于: {formatTime(new Date(post.createdAt))} </span>
                <span>
                  报酬: {post.reward ? `¥${post.reward}` : '自行商议'}
                </span>
              </>
            }
          ></Meta>
        }
      >
        <div className="post_body">
          <div className="title">{post?.title}</div>
          <div className="content">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{post.content}
            {images.current ? (
              <ImageWrapper>
                <span>图片</span>
                {images.current.map((item: any) => {
                  return (
                    <div style={{ margin: 20 }}>
                      <Image src={item} width={'100%'} />
                    </div>
                  );
                })}
              </ImageWrapper>
            ) : null}
          </div>
          {isAuthor ? (
            ApplicantList
          ) : (
            <div className="offer_help">{applyComponent()}</div>
          )}
        </div>
      </Card>
      {/* <AuthorDetailWrapper></AuthorDetailWrapper> */}
      <Card className="author_detail" title="发布者信息" bordered={true}>
        <Link to={`/userInfo/${post.user?.id}`}>
          <Meta
            avatar={<Avatar src={`${PREFIX}${post.user?.avatar}`} />}
            title={post.user?.username}
            description={<span></span>}
          ></Meta>
        </Link>
        <div className="stat">所属区域：{(post.user as any)?.location}</div>
        <div className="stat">
          发布请求数：{(post.authorStat as any)?.postNum}
        </div>
        <div className="stat">
          帮助他人次数：{(post.authorStat as any)?.helpNum}
        </div>
        <List
          header="参与用户"
          itemLayout="horizontal"
          dataSource={memberList}
          style={{ marginTop: '5px' }}
          renderItem={(item: any) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={`${PREFIX}${item.user.avatar}`} />}
                title={<a href="https://ant.design">{item.user.username}</a>}
                description="Ant Design"
              />
            </List.Item>
          )}
        ></List>
      </Card>
    </PostWrapper>
  );
};

export default connect(
  ({ post, loading }: { post: PostModelState; loading: Loading }) => ({
    post,
    loading: loading.models.post,
  }),
)(PostDetail);
