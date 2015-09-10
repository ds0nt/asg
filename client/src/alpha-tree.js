import element from 'virtual-element'
import { render, tree } from 'deku'

import Loader from './alpha-loader'

let Tree = {
  propTypes: {
    treeData: {
      source: 'treeData'
    },
    treeRefreshing: {
      source: 'treeRefreshing'
    },
    itemSelected: {
      source: 'treeItemSelected'
    }
  },
  initialState(props) {
    return {
      templates: [],
      configs: [],
      loading: true,
      item: null
    }
  },

  async afterMount(c, el, setState) {
    let { templates, configs } = await c.props.treeData()
    setState({ templates, configs, loading: false })
  },

  render({ props, state }, setState) {
    let { templates, configs } = state

    let itemSelected = (e, c, u) => {
      console.dir(c)
      setState({ item: c.props.key })
      props.itemSelected(c.props.key)
    }

    templates = templates.map(i =>
      <Item key={`template-${i}`}
        active={`template-${i}` == state.item }
        onClick={itemSelected}>
        {i}
      </Item>
    )
    configs = configs.map(i =>
      <Item key={`config-${i}`}
        active={`config-${i}` == state.item }
        onClick={itemSelected}>
        {i}
      </Item>
    )

    return <div class="ui list segment">
      <Loader active={state.loading}>Loading</Loader>
      <Section header="Templates">
        {templates}
      </Section>
      <Section header="Configs">
        {configs}
      </Section>
    </div>
  }
}
export default Tree

let Item = {
  render: c => {
    if (c.props.active) {
      return <div class="active item">
        <i class="file icon"></i>
        <div class="content">
          <div class="header">{c.props.children}</div>
        </div>
      </div>
    }
    return <a class="item" onClick={c.props.onClick}>
      <i class="file icon"></i>
      <div class="content">
        <div class="header">{c.props.children}</div>
      </div>
    </a>
  }
}

let Section = {
  render: c => <div class={`item ${c.props.active ? "active" : ""}`}>
    <i class="tag icon"></i>
    <div class="content">
      <div class="header">{c.props.header}</div>
      <div class="description">{c.props.description}</div>
      <div class="ui link list">
        {c.props.children}
      </div>
    </div>
  </div>
}
