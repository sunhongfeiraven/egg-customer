import { isUrl } from '../utils/utils';

const menuData = [
  {
    name: '客户管理',
    icon: 'solution',
    path: 'customer/list',
  },
  {
    name: '项目管理',
    icon: 'environment-o',
    path: 'project/list',
  },
];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map((item) => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
