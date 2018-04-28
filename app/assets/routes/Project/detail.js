import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Card, Divider, Button, Table } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import DescriptionList from '../../components/DescriptionList';
import dic from '../../utils/dictionary';

const { Description } = DescriptionList;

@connect(({ project, loading }) => ({
  project,
  loading: loading.models.customer,
}))
export default class BasicProfile extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    const { projectId } = this.props.match.params;
    dispatch({
      type: 'project/fetchDetail',
      payload: { projectId },
    });
  }

  handleUpdate = (e) => {
    e.preventDefault();
    const { projectId } = this.props.match.params;
    this.props.dispatch(routerRedux.push(`/project/update/${projectId}`));
  };

  render() {
    const { detail } = this.props.project;

    const columns = [
      {
        title: '记录详情',
        dataIndex: 'content',
        key: 'content',
      },
      {
        title: '记录时间',
        dataIndex: 'time',
        key: 'time',
      },
    ];
    return (
      <PageHeaderLayout
        title="项目详情"
        extraContent={
          <Button type="primary" onClick={this.handleUpdate}>
            编辑
          </Button>
        }
      >
        <Card bordered={false}>
          <DescriptionList size="large" title="基本信息" style={{ marginBottom: 32 }}>
            <Description term="项目名称">{detail.name}</Description>
            <Description term="规模">{dic.scope[detail.scope]}</Description>
            <Description term="类型">{dic.projectType[detail.type]}</Description>
            <Description term="项目来源">{dic.source[detail.source]}</Description>
            <Description term="地址">{detail.address}</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <DescriptionList size="large" title="接洽记录" style={{ marginBottom: 32 }} >
            <Table columns={columns} dataSource={detail.record} />
          </DescriptionList>
        </Card>
      </PageHeaderLayout>
    );
  }
}
