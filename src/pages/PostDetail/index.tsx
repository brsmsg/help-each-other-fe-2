import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { PostWrapper, PostDetailWrapper } from './style';
import { Avatar, Card, List, Input, Button } from 'antd';
import { connect, Loading } from 'umi';
import { PostModelState } from './model';
import { participantsRequest } from './service';

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
  

  useEffect(() => {
    const { id } = match.params as any;
    dispatch({
      type: 'post/getPostInfo',
      payload: {
        id,
      },
    });

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
            description="This is the description"
          ></Meta>
        }
        // actions={[<div className="offer_help">我要帮他！</div>]}
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
          <div className="offer_help">
            <span>请输入申请信息</span>
            <TextArea allowClear autoSize={{ minRows: 3, maxRows: 5 }} />
            <Button style={{ marginTop: '20px' }}>我要帮他</Button>
          </div>
        </div>
      </Card>
      {/* <AuthorDetailWrapper></AuthorDetailWrapper> */}
      <Card className="author_detail" title="发布者信息" bordered={true}>
        <Meta
          avatar={
            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          }
          title="Card title"
          description="This is the description"
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
