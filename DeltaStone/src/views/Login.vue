<template>
<div class="login-container" style="">
    <a-card title="用户登录" style="width: 300px;">
        <a-form>
            <a-form-item label="账号">
                <a-input 
                v-model="username" 
                placeholder="请输入账号">
                </a-input>
            </a-form-item>

            <a-form-item label="密码">
                <a-input-password
                    v-model="password" 
                    placeholder="请输入密码"
                    allow-clear
                    >
                </a-input-password>
            </a-form-item>

            <a-button 
            type="primary" 
            block 
            @click="handleLogin"
            >
            登录
            </a-button>
        </a-form>

    </a-card>
</div>
</template>


<script setup>
import { Card, Form, Input, Button, InputPassword } from 'ant-design-vue';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

// 组件显式注册
const AButton = Button;
const ACard = Card;
const AForm = Form;
const AFormItem = Form.Item;
const AInput = Input;
const AInputPassword = InputPassword;

// 登录逻辑实现
const username = ref('');
const password = ref('');
const router = useRouter();

// 登录逻辑
const handleLogin = () => {
    const isAdmin = username.value.toLowerCase().includes('admin');
    if (isAdmin) {
      router.push('/adminhome');
    } else {
      router.push('/userhome');
    }
};

</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f2f5;
}
</style>
