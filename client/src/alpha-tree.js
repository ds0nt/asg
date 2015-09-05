import element from 'virtual-element'
import { render, tree } from 'deku'

let FileItem = {
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

let FolderItem = {
  render: c => <div class={`item ${c.props.active ? "active" : ""}`}>
    <i class="folder icon"></i>
    <div class="content">
      <div class="header">{c.props.header}</div>
      <div class="description">{c.props.description}</div>
      <div class="ui link list">
        {c.props.children}
      </div>
    </div>
  </div>
}

let Loader = {
  render({props}) {
    return <div class={`ui ${props.active ? "active" : ""} dimmer`}>
      <div class="ui text loader">Loading</div>
    </div>
  }
}

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
      <FileItem key={`template-${i}`}
        active={`template-${i}` == state.item }
        onClick={itemSelected}>
        {i}
      </FileItem>
    )
    configs = configs.map(i =>
      <FileItem key={`config-${i}`}
        active={`config-${i}` == state.item }
        onClick={itemSelected}>
        {i}
      </FileItem>
    )

    return <div class="ui list segment">
      <Loader active={state.loading}>Loading</Loader>
      <FolderItem header="Templates" description="Template files for project">
        {templates}
      </FolderItem>
      <FolderItem header="Configs" description="Config data for templates">
        {configs}
      </FolderItem>
    </div>
  }
}
export default Tree
