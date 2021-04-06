import React, {
  TextareaHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from 'react';
import { RouteComponentProps } from 'react-router';
import { PostWrapper, PostDetailWrapper } from './style';
import { Avatar, Card, List, Input, Button, message } from 'antd';
import { connect, Loading, useRequest } from 'umi';
import { PostModelState } from './model';
import { participantsRequest, applyRequest, getApplyStatus } from './service';
import { getUserId } from '@/utils/currentUser';
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

  const data = [
    {
      title: 'Ant Design Title 1',
    },
    {
      title: 'Ant Design Title 2',
    },
    {
      title: 'Ant Design Title 3',
    },
    {
      title: 'Ant Design Title 4',
    },
  ];

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
            {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
            内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
            内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
            内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
            内容内容内容内容内容内容内容内容内容内容内容内容内容内容 */}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{post.content}
          </div>
          {getUserId() === post.user?.id?.toString() ? null : (
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
          dataSource={data}
          style={{ marginTop: '5px' }}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title={<a href="https://ant.design">{item.title}</a>}
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
