import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Card, Divider, Button } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import DescriptionList from '../../components/DescriptionList';
import dic from '../../utils/dictionary';

const { Description } = DescriptionList;


@connect(({ customer, loading }) => ({
  customer,
  loading: loading.models.customer,
}))
export default class BasicProfile extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    const { customerId } = this.props.match.params;
    dispatch({
      type: 'customer/fetchDetail',
      payload: { customerId },
    });
  }

  handleUpdate=(e) => {
    e.preventDefault();
    const { customerId } = this.props.match.params;
    this.props.dispatch(routerRedux.push(`/customer/update/${customerId}`));
  }

  render() {
    const { detail } = this.props.customer;
    return (
      <PageHeaderLayout title="客户详情" extraContent={<Button type="primary" onClick={this.handleUpdate}>编辑</Button>}>
        <Card bordered={false}>
          <DescriptionList size="large" title="基本信息" style={{ marginBottom: 32 }}>
            <Description term="客户名称">{detail.name}</Description>
            <Description term="婚姻状况">{dic.marital[detail.marital]}</Description>
            <Description term="年龄">{detail.age}</Description>
            <Description term="性别">{dic.sex[detail.sex]}</Description>
            <Description term="学历">{dic.education[detail.education]}</Description>
            <Description term="籍贯">{detail.placeOfOrigin}</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <DescriptionList size="large" title="其他信息" style={{ marginBottom: 32 }}>
            <Description term="详细地址">{detail.address}</Description>
            <Description term="爱好">{detail.hobby}</Description>
            <Description term="性格">{detail.character}</Description>
            <Description term="社会背景">{detail.social}</Description>
            <Description term="经历">{detail.experience}</Description>
          </DescriptionList>
        </Card>
      </PageHeaderLayout>
    );
  }
}
