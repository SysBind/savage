// Wrap an Elm element in HTMLElement and register it
// as a Web Component


const camelize = str => {
  return str
    .toLowerCase()
    .replace(/[-_]+/g, ' ')
    .replace(/[^\w\s]/g, '')
    .replace(/ (.)/g, firstChar => firstChar.toUpperCase())
    .replace(/ /g, '')
}

const getProps = el => {
  const props = {}

  for (let i = 0; i < el.attributes.length; i++) {
    const attribute = el.attributes[i]
    const name = camelize(attribute.name)
    props[name] = attribute.value
  }
  return props
}


const webComponents = {
    register(
	Name,
	ElmComponent,
	{
	    setupPorts = () => {},
	    staticFlags = {},
	    onDetached = () => {},
	    mapFlags = flags => flags,
	    onSetupError,
	    useShadowDom = false,
	} = {}	
    ) {
    class ElmElement extends HTMLElement {
      connectedCallback() {
          const context = {}
          try {
              let props = Object.assign({}, getProps(this), staticFlags)
              if (Object.keys(props).length === 0) props = undefined

              const flags = mapFlags(props)
              context.flags = flags

              const parentDiv = useShadowDom ? this.attachShadow({mode: 'open'}) : this;

	      const elmDiv = document.createElement('div')	      
	      parentDiv.innerHTML = ''
	      parentDiv.appendChild(elmDiv)
	      
	      const elmElement = ElmComponent.init({
		  flags,
		  node: elmDiv,
	      })
	      setupPorts(elmElement.ports)
          } catch (error) {
              if (onSetupError) {
		  onSetupError(error, context)
              } else {
		  console.error(
		      `Error from elm-web-components registering ${name}`,
		      'You can pass an `onSetupError` to handle these.',
		      error
		  )
              }
          }
      }	
      disconnectedCallback() {
         onDetached()
      }
    }
	
    customElements.define(Name, ElmElement)
    }
}

// module.exports = webComponents


webComponents.register("elm-button", Elm.Button)
