
import element from 'virtual-element'
import { render, tree } from 'deku'

let Loader = {
  render({props}) {
    return <div class={`ui ${props.active ? "active" : ""} dimmer`}>
      <div class="ui text loader">Loading</div>
    </div>
  }
}

export default Loader
