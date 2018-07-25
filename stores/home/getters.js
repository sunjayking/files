export default {
	// 计算当前模块信息
	curModule (state, getters) {

		let modules = state.userConfig ? state.userConfig.module : '';
		let curRoute = state.curRoute || '';
		let midx = '', //模块下标
			cidx = '', //当前打开的子菜单下标
			curmodule = '', //当前页面模块
			curModuleC = ''; // 当前模块打开的子菜单
		function getModuleInfo (m, routeName, id) {
			m.forEach((i, idx) => {
				if (i.comId && i.comId === routeName) {
					if (i.id && i.id === id) {
						curModuleC = i;
					} else if (!i.id) {
						curModuleC = i;
					}
				} else if (i.children || i.hideChildren) {
					i.children && getModuleInfo(i.children, routeName, id)
					i.hideChildren && getModuleInfo(i.hideChildren, routeName, id)
				}
			})
		}
    
		if (modules && curRoute) {
			let routeName = curRoute.name;
			let id = curRoute.params.id ? curRoute.params.id : '';
			getModuleInfo(modules, routeName, id)
			if (curModuleC && curModuleC.idx) {
				let indexList = curModuleC.idx.split('-');
				midx = indexList[0];
				cidx = indexList.slice(1) ? indexList.slice(1).join('-') : '';
				curmodule = modules[midx]
			}
			
		}
		console.log('curmodule')
		console.log(state.curRoute)
		return {
			curRoute: state.curRoute,
			midx,
			curmodule,
			curModuleC,
			cidx
		};
    },
}