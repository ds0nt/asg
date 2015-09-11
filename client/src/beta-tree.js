import element from 'virtual-element'
import { render, tree } from 'deku'

import Loader from './alpha-loader'

let Tree = {
  initialState(props) {
    return {
      loading: true,
      item: null,
      items: [],
      adding: false
    }
  },

  async afterMount(c, el, setState) {
    let items = await c.props.items()
    setState({
      items: items.data,
      loading: false
    })
  },

  render({ props, state }, setState) {
    let { items=[] } = state

    let add = async(e, c) => {
      setState({ adding: false, loading: true })
      let item = await c.props.newItem(c.state.adding, "")
      let items = await c.props.items()
      setState({ items: items.data, loading: false })
    }

    let select = (e, c, u) => {
      setState({ item: c.props.item })
      props.clicked(c.props.item)
    }

    console.log(items)
    let list = items.map(item =>
      <Item active={state.item} item={item} onClick={select} />
    )

    return <div class="ui list segment">
      <Loader active={state.loading}>Loading</Loader>
      <div class="ui top attached inverted segment">
        <i class="tag icon"></i>{props.title}
        { state.adding !== false ? <div>
            <input type="text" class="ui inverted tiny basic input" onChange={ e => setState({ adding: e.target.value }) } />
            <div class="ui inverted tiny basic button" onClick={add}>
              <i class="inverted icon add"></i>
            </div>
          </div> : <div class="ui inverted tiny basic button" onClick={() => setState({ adding: '' })}>
            <i class="inverted add icon"></i>
          </div> }
      </div>
      {list}

    </div>
  }
}
export default Tree

let Item = {
  render: c => {
    if (c.props.active == c.props.item) {
      return <div class="active item">
        <i class="file icon"></i>
        <div class="content">
          <div class="description">{c.props.item}</div>
        </div>
      </div>
    }
    return <a class="item" onClick={c.props.onClick}>
      <i class="file icon"></i>
      <div class="content">
        <div class="description">{c.props.item}</div>
      </div>
    </a>
  }
}
