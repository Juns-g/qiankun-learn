// 拼接字符串
router.push('/home?username=xxx&age=18')

// query 对象
router.push({
  path: '/home',
  query: {
    username: 'xxx',
    age: 18,
  },
})
