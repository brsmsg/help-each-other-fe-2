import React, { useEffect, useState } from 'react';
import { SettingsWrapper, SettingProfile } from './style';
import { Card, Form } from 'antd';
import FormItem from '@/components/FormItem';
import { getUser } from '@/utils/currentUser';

const Settings = () => {
  const user = getUser();
  return (
    <SettingsWrapper>
      <SettingProfile>
        <Card title="修改信息">
          <FormItem
            name="username"
            label="用户名"
            defaultValue={user?.username}
          ></FormItem>
          <FormItem
            name="location"
            label="学校"
            defaultValue={user?.location}
          ></FormItem>
          <FormItem
            name="gender"
            label="性别"
            type="gender"
            defaultValue={user?.gender}
          ></FormItem>
          <FormItem
            name="avatar"
            label="头像"
            type="image"
            defaultValue={user?.avatar}
          ></FormItem>
        </Card>
      </SettingProfile>
    </SettingsWrapper>
  );
};

export default Settings;
