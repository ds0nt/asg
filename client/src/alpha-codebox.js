import element from 'virtual-element'
import { render, tree } from 'deku'

require('codemirror/mode/javascript/javascript')
require('codemirror/mode/css/css')
require('codemirror/mode/htmlmixed/htmlmixed')
import codebox from 'codemirror'

let Code = {
  propTypes: {
    item: {
      source: 'item'
    },
  },
  defaultProps: {
    item: {
      name: 'untitled',
      data: ''
    }
  },
  render(c) {
    return <div class="ui segment code-container">
      <div class="ui top left attached label">{c.props.item.name}</div>
    </div>
  },
  afterMount({ props, state, id }, elem, update) {
    update({
      codemirror: codebox(elem, {
        mode: 'htmlmixed',
        theme: 'monokai',
        inputStyle: "contenteditable",
        lineNumbers: true,
        tabsize: 2
      })
    })
  },
  afterUpdate(c) {
    console.dir(c.props.item)
    if (c.props.item)
      c.state.codemirror.setValue(c.props.item.data)
  }
}

export default Code
