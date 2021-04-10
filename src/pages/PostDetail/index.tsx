import React, {
  TextareaHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from 'react';
import { RouteComponentProps } from 'react-router';
import { PostWrapper, PostDetailWrapper, Interaction } from './style';
import { Avatar, Card, List, Input, Button, message } from 'antd';
import { connect, Loading, useRequest } from 'umi';
import { PostModelState } from './model';
import {
  participantsRequest,
  applyRequest,
  getApplyStatus,
  getApplyList,
  changeApplySatus,
  addViewNum,
} from './service';
import { getUserId } from '@/utils/currentUser';
import style from '@/assets/gloabalStyle';
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
  const [memberList, setMemberList] = useState();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const { id } = match.params as any;
    dispatch({
      type: 'post/getPostInfo',
      payload: {
        id,
      },
    });
  }, []);

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
      if (res.errno === 0) {
        const { is_accept } = res.data;
        if (is_accept) setApplyStatus(2);
        else setApplyStatus(1);
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
      // applicantId: getUserId(),
      applicantId: '1',
      postId: post.id,
      text,
    });
    if (res.errno === 0) {
      message.success('申请已发送');
      setApplyStatus(1);
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
    }
    return content;
  };

  const ApplicantList = (
    <>
      {applyList == [] ? (
        <List header="还没有人申请"></List>
      ) : (
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
            avatar={
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            }
            title={post.user?.username}
            description={
              <>
                <span>发布于: {post.createdAt} </span>
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
        <Meta
          avatar={
            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          }
          title={post.user?.username}
          description={<span></span>}
        ></Meta>
        <div className="stat">
          所属区域：{(post.authorStat as any)?.location}
        </div>
        <div className="stat">
          发布请求数：{(post.authorStat as any)?.postCount}
        </div>
        <div className="stat">
          帮助他人次数：{(post.authorStat as any)?.helpCount}
        </div>
        <List
          header="参与用户"
          itemLayout="horizontal"
          dataSource={memberList}
          style={{ marginTop: '5px' }}
          renderItem={(item: any) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
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
