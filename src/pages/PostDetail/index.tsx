import React, { useEffect } from 'react';
import { PostWrapper, PostDetailWrapper } from './style';
import { Avatar, Card, List, Input, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';

interface PostDetail {}

const PostDetail: React.FC<PostDetail> = (props) => {
  const { Meta } = Card;
  const { TextArea } = Input;
  useEffect(() => {}, []);

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
            title="Card title"
            description="This is the description"
          ></Meta>
        }
        // actions={[<div className="offer_help">我要帮他！</div>]}
      >
        <div className="post_body">
          <div className="title">title</div>
          <div className="content">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
            内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
            内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
            内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
            内容内容内容内容内容内容内容内容内容内容内容内容内容内容
          </div>
          <div className="offer_help">
            <span>请输入申请信息</span>
            <TextArea allowClear autoSize={{ minRows: 3, maxRows: 5 }} />
            <Button style={{marginTop: '20px'}}>我要帮他</Button>
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
        <div className="stat">所属区域：</div>
        <div className="stat">发布请求数：</div>
        <div className="stat">帮助他人次数：</div>
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

export default PostDetail;
