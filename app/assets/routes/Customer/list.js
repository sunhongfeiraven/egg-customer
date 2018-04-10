import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
  Table,
  Row,
  Col,
  Card,
  Form,
  Input,
  Button,
  Divider,
} from 'antd';
import { Link, routerRedux } from 'dva/router';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './index.less';

const FormItem = Form.Item;

const columns = [
  {
    title: '客户名称',
    dataIndex: 'name',
  },
  {
    title: '创建时间',
    dataIndex: 'createAt',
    sorter: true,
    render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm')}</span>,
  },
  {
    title: '操作',
    dataIndex: 'id',
    render: (_, record) => (
      <Fragment>
        <Link to={`/member/detail/${record._id}`}>详情</Link>
        <Divider type="vertical" />
        <a href="">订阅警报</a>
      </Fragment>
    ),
  },
];

@connect(({ customer, loading }) => ({
  customer,
  loading: loading.models.customer,
}))
@Form.create()
export default class TableList extends PureComponent {
  componentDidMount() {
    this.handleSearch({ current: 1 });
  }

  onSearch = (e) => {
    e.preventDefault();
    this.handleSearch({ current: 1 });
  };

  handleStandardTableChange = (pagination) => {
    const { current } = pagination;
    this.handleSearch({ current });
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    dispatch({
      type: 'rule/fetch',
      payload: {},
    });
  };

  toggleForm = () => {
    this.setState({
      expandForm: !this.state.expandForm,
    });
  };

  // todo search
  handleSearch=({ current }) => {
    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      dispatch({
        type: 'customer/fetchList',
        payload: {
          ...fieldsValue,
          page: { current },
        },
      });
    });
  }

  renderForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.onSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="客户名称">
              {getFieldDecorator('name')(<Input placeholder="请输入客户名称" />)}
            </FormItem>
          </Col>
        </Row>
        <div style={{ overflow: 'hidden' }}>
          <span style={{ float: 'right', marginBottom: 24 }}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
              重置
            </Button>
          </span>
        </div>
      </Form>
    );
  }

  render() {
    const { customer: { data }, loading, dispatch } = this.props;
    const { list, page } = data;

    const pagination = {
      ...page,
      showQuickJumper: true,
      showTotal: total => <span>共{total}条</span>,
    };

    return (
      <PageHeaderLayout title="客户列表">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => dispatch(routerRedux.push('/customer/add'))}>
                新建
              </Button>
            </div>
            <Table
              rowKey="_id"
              loading={loading}
              dataSource={list}
              columns={columns}
              onChange={this.handleStandardTableChange}
              pagination={pagination}
            />
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}
