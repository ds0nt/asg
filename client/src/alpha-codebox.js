import element from 'virtual-element'
import { render, tree } from 'deku'

require('codemirror/mode/javascript/javascript')
require('codemirror/mode/css/css')
require('codemirror/mode/yaml/yaml')

import codebox from 'codemirror'

let CodeBoxes = {}

let Code = {
  initialState(props) {
    return {
      loading: true
    }
  },
  render(c) {
    let newItem = () => {
      c.props.ui.newItem()
    }
    let saveItem = (e, c2 ) => {
      console.log(CodeBoxes[c.id].getValue())
      c.props.item.save(CodeBoxes[c.id].getValue())
    }
    return <div class="ui inverted segment code-container">
        <div class="ui top attached label">{c.props.item.name}</div>
        <div class="ui icon inverted basic buttons">
          <button onClick={newItem} class="ui inverted basic button"><i class="inverted file icon"></i></button>
          <button onClick={saveItem} class="ui inverted basic button"><i class="inverted save icon"></i></button>
          <button class="ui inverted basic button"><i class="inverted upload icon"></i></button>
          <button class="ui inverted basic button"><i class="inverted download icon"></i></button>
        </div>
      </div>
  },

  async afterMount(c, el, setState) {
    let data = await c.props.item.fetch()

    CodeBoxes[c.id] = codebox(el, {
      mode: 'yaml',
      theme: 'monokai',
      inputStyle: "contenteditable",
      lineNumbers: true,
      tabsize: 2
    })
    CodeBoxes[c.id].setValue(data.data)
  },
}

export default Code
