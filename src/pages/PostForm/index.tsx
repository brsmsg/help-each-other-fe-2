import React, { useRef, useState } from 'react';
import { PostFormWrapper, FormWrapper } from './style';
import {
  Form,
  Input,
  Select,
  Upload,
  message,
  Button,
  Card,
  Avatar,
} from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { postRequest } from './service';
import { history } from 'umi';
import { getUserId } from '@/utils/currentUser';
import UserDetail from '@/components/UserDetail';

interface PostFormProps {}

const { TextArea } = Input;
const { Meta } = Card;
const { Option } = Select;
export const PostForm: React.FC<PostFormProps> = (props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [fileNum, setFileNum] = useState<number>(0);
  const [urlList, setUrlList] = useState<string[]>([]);

  const handleChange = (info: any) => {
    if (info.file.status === 'done') {
      message.success('图片上传成功');
      setFileNum(fileNum + 1);
      const { data } = info.file.response;
      const newUrlList = [...urlList, data];
      setUrlList(newUrlList);
    }
  };

  const onFinish = async (values: any) => {
    Object.assign(values, { images: urlList, creator: getUserId() });
    console.log('values', values);
    const res = await postRequest(values);
    if (res.errno === 0) {
      message.success('帖子发布成功');
      const { id } = res.data;
      history.push(`post/${id}`);
    } else {
      message.error('发布失败，请重试');
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <PostFormWrapper>
      <FormWrapper>
        <Card title="发布信息">
          <Form size="middle" onFinish={onFinish} title="发布信息">
            <Form.Item name="title" label="标题">
              <Input size="small" style={{ height: 30 }} />
            </Form.Item>
            <Form.Item name="tag" label="标签">
              <Select size="middle" style={{ height: 30 }}>
                <Option value="代拿快递">代拿快递</Option>
                <Option value="超市代购">超市代购</Option>
                <Option value="拼车出行">拼车出行</Option>
                <Option value="活动积赞">活动积赞</Option>
                <Option value="其他">其他</Option>
              </Select>
            </Form.Item>
            <Form.Item name="maxMembers" label="最大参与人数">
              <Input
                type="number"
                // style={{ width:  }}
                min={0}
                defaultValue={0}
              />
            </Form.Item>
            <Form.Item name="reward" label="报酬">
              <Input
                placeholder="不填写默认为自行商议"
                prefix="￥"
                suffix="RMB"
              ></Input>
            </Form.Item>
            <Form.Item name="content" label="内容">
              <TextArea  className="textarea"/>
            </Form.Item>
            <Form.Item name="image" label="图片">
              <Upload
                action="http://localhost:3001/post/uploadImg"
                listType="picture-card"
                // fileList={fileList}
                // onPreview={this.handlePreview}
                onChange={handleChange}
              >
                {fileNum >= 3 ? null : uploadButton}
              </Upload>
            </Form.Item>
            <Form.Item style={{ textAlign: 'center' }}>
              <Button htmlType="submit" className="submit">
                提交
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </FormWrapper>

      <div className="detail">
        <UserDetail title="用户信息" id={getUserId()} />
      </div>
    </PostFormWrapper>
  );
};

export default PostForm;
