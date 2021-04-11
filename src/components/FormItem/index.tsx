import React, { useEffect, useRef, useState } from 'react';
import { FormImtemWrapper } from './style';
import { Form, Input, Radio, message, Upload, Button, Avatar } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { updateProfile } from './service';
import { getUser, getUserId, updateLocalStorage } from '@/utils/currentUser';

interface FormItemProps {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
  defaultValue?: string;
}

const FormItem: React.FC<FormItemProps> = (props) => {
  const { label, name, placeholder, type, defaultValue } = props;

  const [gender, setGender] = useState('');
  const inputRef = useRef<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [url, setUrl] = useState('');
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(defaultValue as string);
    if (type === 'image') setUrl(defaultValue);
  }, []);

  const onchange = (e: any) => {
    setValue(e.target.value);
  };

  const onUpdate = async () => {
    const input = inputRef.current;

    const body: any = { id: getUserId(), data: {} };
    if (type === 'image') {
      body.data[name] = url;
    } else {
      setValue(input.value);
      body.data[name] = value;
    }
    const data = await updateProfile(body);

    if (data === 'success') {
      message.success('更新成功');
      if (type === 'image') {
        updateLocalStorage(name, url);
      } else {
        updateLocalStorage(name, value);
      }
    } else {
      message.error('更新失败');
    }
  };

  const onCancel = () => {
    if (type !== 'image') {
      const input = inputRef.current;
      input.value = '';
    }
  };

  const onAvatarChange = (info: any) => {
    if (info.file.status === 'done') {
      message.success('头像上传成功');
      const { data } = info.file.response;
      setUrl(data);
      console.log('url', url);
    }
  };

  const InputContent = () => {
    let content = null;
    if (!type)
      content = (
        <input
          style={{ border: 'none', outline: 'none' }}
          defaultValue={value}
          ref={inputRef}
          onChange={onchange}
        />
      );
    if (type === 'gender') {
      content = (
        <Radio.Group onChange={onchange} value={value} ref={inputRef}>
          <Radio value="0">
            男{' '}
            <i className="iconfont" style={{ color: 'blue' }}>
              &#xebed;
            </i>
          </Radio>
          <Radio value="1">
            女{' '}
            <i className="iconfont" style={{ color: 'red' }}>
              &#xe649;
            </i>
          </Radio>
        </Radio.Group>
      );
    }
    if (type === 'image') {
      content = (
        <div style={{ marginTop: 20, marginBottom: 20 }}>
          <Avatar
            size={100}
            style={{ marginRight: 20 }}
            src={`http://localhost:3001${url}`}
          />
          <Upload
            action="http://localhost:3001/users/uploadAvatar"
            onChange={onAvatarChange}
          >
            <Button icon={<UploadOutlined />}>点击上传</Button>
          </Upload>
        </div>
      );
    }
    return content;
  };

  return (
    <FormImtemWrapper>
      <div className="label">{label}</div>
      <div className="input">{InputContent()}</div>
      <div className="suffix">
        <i className="iconfont">&#xe61d;</i>
        <span className="update" onClick={onUpdate}>
          修改
        </span>
        <span className="cancel" onClick={onCancel}>
          取消
        </span>
      </div>
    </FormImtemWrapper>
  );
};

export default FormItem;
