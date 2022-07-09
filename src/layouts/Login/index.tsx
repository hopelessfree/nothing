import { FC, ReactElement, useEffect } from 'react';
import { message } from 'antd';
import { LoginProps, Foucs } from '@/typings/Login';
import { login } from '../services';
import { useState } from 'react';
import { history } from 'umi';
import { globalData } from '../../../config/globalData';
import './index.less';

const Index: FC = (): ReactElement => {
  const [focus, setFocus] = useState<Foucs>();
  const [form, setForm] = useState<LoginProps>({
    username: '',
    password: '',
  });

  const placeholders = {
    username: 'Username',
    password: 'Password',
  };

  const enterDown = (ev: KeyboardEvent) => {
    const { key } = ev;
    if (key === 'Enter') {
      onLogin();
    }
  };

  // 判断是否已经登录 已登录则自动跳转
  useEffect(() => {
    const token = localStorage.getItem('token') || '';
    globalData.token = token;

    if (token) {
      history.push('/');
    }
  }, []);

  // 添加 Enter 登陆事件
  useEffect(() => {
    document.addEventListener('keypress', enterDown);

    return () => {
      document.removeEventListener('keypress', enterDown);
    };
  }, []);

  // 登录完成
  const onLogin = () => {
    const { username, password } = form;

    if (!username) {
      message.error('请输入用户名').then(() => null);
      return;
    }

    if (!password) {
      message.error('请输入密码').then(() => null);
      return;
    }

    login(form).then((res) => {
      if (res.data === false) return;
      globalData.token = 'person-xxxx';
      localStorage.setItem('token', 'person-xxxx');
      history.push('/');
    });
  };

  setTimeout(function () {
    document.body.classList.add('on-start');
  }, 100);

  setTimeout(function () {
    document.body.classList.add('document-loaded');
  }, 1800);

  return (
    <div className="main">
      <form className="form">
        <div className="form__cover" />

        <div className="form__loader">
          <div className="spinner active">
            <svg className="spinner__circular" viewBox="25 25 50 50">
              <circle
                className="spinner__path"
                cx="50"
                cy="50"
                r="20"
                fill="none"
                strokeWidth="4"
                strokeMiterlimit="10"
              ></circle>
            </svg>
          </div>
        </div>

        <div className="form__content">
          <h1>Person-XXXX</h1>

          {/* 账号 */}
          <div
            className={[
              'styled-input',
              (focus === 'username' || form.username) && 'filled',
            ].join(' ')}
          >
            <input
              autoComplete="off"
              type="text"
              className="styled-input__input"
              name="nickname"
              onFocus={() => setFocus('username')}
              onBlur={() => setFocus(undefined)}
              value={form.username}
              onChange={({ target: { value } }) =>
                setForm({ ...form, ['username']: value })
              }
            />
            <div className="styled-input__placeholder">
              <span className="styled-input__placeholder-text">
                {placeholders.username.split('').map((item, index) => (
                  <span
                    key={index}
                    className={[
                      'letter',
                      (focus === 'username' || form.username) && 'active',
                    ].join(' ')}
                  >
                    {item}
                  </span>
                ))}
              </span>
            </div>
            <div className="styled-input__circle" />
          </div>

          {/* 密码 */}
          <div
            className={[
              'styled-input',
              (focus === 'password' || form.password) && 'filled',
            ].join(' ')}
          >
            <input
              autoComplete="off"
              type="text"
              className="styled-input__input"
              onFocus={() => setFocus('password')}
              onBlur={() => setFocus(undefined)}
              value={form.password}
              onChange={({ target: { value } }) =>
                setForm({ ...form, ['password']: value })
              }
            />
            <div className="styled-input__placeholder">
              <span className="styled-input__placeholder-text">
                {placeholders.password.split('').map((item, index) => (
                  <span
                    key={index}
                    className={[
                      'letter',
                      (focus === 'password' || form.password) && 'active',
                    ].join(' ')}
                  >
                    {item}
                  </span>
                ))}
              </span>
            </div>
            <div className="styled-input__circle" />
          </div>

          <button type="button" className="styled-button" onClick={onLogin}>
            <span className="styled-button__real-text-holder">
              <span className="styled-button__real-text">login</span>
              <span className="styled-button__moving-block face">
                <span className="styled-button__text-holder">
                  <span className="styled-button__text">login</span>
                </span>
              </span>

              <span className="styled-button__moving-block back">
                <span className="styled-button__text-holder">
                  <span className="styled-button__text">login</span>
                </span>
              </span>
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Index;
