import element from 'virtual-element'
import { render, tree } from 'deku'

let Tree = {
  render: function ({ props }) {
    let listItems = props.items.map(
      i => <li onClick={() => props.select(i)}>{i}</li>
    )
    return <ul>
      <li class="list-title">{props.title}</li>
      {listItems}
    </ul>
  }
}

export default Tree
