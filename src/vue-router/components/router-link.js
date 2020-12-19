export default {
  name: 'router-link',
  functional: true,
  props: {
    to: {
      type: String,
     
    },
    tag: {
      type: String,
      default: 'a'
    }
  },
  render (h, context) {
    const handleClick = () => {
      // 拿到父组件的$router
      // 跳转到context.props.to
      context.parent.$router.push(context.props.to)
    }
    console.log(context)
    return h(context.props.tag || 'a', {
      on: {
        click: handleClick
      }
    }, context.slots().default)
  }
}