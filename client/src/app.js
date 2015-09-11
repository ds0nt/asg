require("babelify/polyfill")
import { render, tree } from 'deku'
import element from 'virtual-element'

import { templates, configs } from './item-store'

import Codebox from './alpha-codebox'
import BTree from './beta-tree'


let Grid = {
  render({props, state}, setState) {
    let { boxes = [] } = state

    let opentemplate = item => {
      boxes.push({
        name: item,
        fetch: () => templates.fetch(item),
        save: (data) => templates.save(item, data)
      })
      setState({ boxes })
    }

    let openconfig = item => {
      boxes.push({
        name: item,
        fetch: () => configs.fetch(item),
        save: (data) => configs.save(item, data)
      })
      setState({ boxes })
    }

    return <div class="ui grid container">
      <div class="four wide column">
        <BTree
          title="templates"
          newItem={templates.save}
          clicked={opentemplate}
          items={templates.load} />
      </div>
      <div class="four wide column">
        <BTree
          title="configs"
          newItem={configs.save}
          clicked={openconfig}
          items={configs.load} />
      </div>
      <div class="twelve wide column">
        {
          boxes.map(box => <Codebox item={box}></Codebox>)
        }
      </div>
    </div>
  }
}

let app = tree(
  <Grid />
)

render(app, document.getElementById('app'))
