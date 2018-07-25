import router from '@/router';

function getPath (item) {

  function getRoute (name) {
    let result = '';
    function a (arr) {
      arr.forEach(item => {
        if (item.name === name) {
          result = item;
          return false;
        } else if (item.children) {
          a(item.children)
        }
      })
    }
    a(router.options.routes[0].children);
    return result;
  }

  function getRoutePath (name='', id='') {
    let result = getRoute(name);
    let path = result ? (result.pathAlias ? result.pathAlias : (result.path ? result.path : '')) : '';
    path = path ? (!item.isTop ? (`/home/${path}${id ? ('/'+id) : ''}`) : `${path}${id ? ('/'+id): ''}`) : '';
    return path;
  }

  let path = getRoutePath(item.comId, item.id);
  let query = item.query || {};
  return {
    path,
    query
  }
}

function setNavAndIdx (o, a=[], idx) {
  o.nav = a.slice(0);
  o.router = getPath(o);
  !o.isTop && o.nav.push({title:o.title, router:o.router});

  o.idx = idx;
  if (o.children && o.children.length > 0 ) {
    o.children.forEach((i,index) => {
      setNavAndIdx(i, o.nav || [], o.idx + '-' + index)
    })
  }
  if (o.hideChildren && o.hideChildren.length > 0) {
    o.hideChildren.forEach((i,index) => {
      setNavAndIdx(i, o.nav || [], o.idx + '-' + index)
    })
  }
}


export default {
  setUserConfig (state, data) {
    let module = data.module;
    if (module.length > 0) {
      module.forEach((item, idx)=> {
        setNavAndIdx(item, [], idx)
        // item.idx = idx;
        // if (item.children && item.children.length > 0) {
        //   item.children.forEach((Item,index) => {
        //     setNavAndIdx(Item, [], idx + '-' + index)
        //   })
        // }

      })
    }
    // console.log(module);
    state.userConfig = data;
  },

  // 设置state
  setState (state, {key, value}) {
    state[key] = value;
  },

  toggleMenu (state) {
    state.menu = !state.menu;
  },
}