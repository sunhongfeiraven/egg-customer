import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Table, Row, Col, Card, Form, Input, Button } from 'antd';
import { Link, routerRedux } from 'dva/router';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './index.less';

const FormItem = Form.Item;

const columns = [
  {
    title: '项目名称',
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
        <Link to={`/project/detail/${record.customerId}`}>详情</Link>
      </Fragment>
    ),
  },
];

@connect(({ project, loading }) => ({
  list: project.list,
  page: project.page,
  loading: loading.models.project,
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
    const { form } = this.props;
    form.resetFields();
  };

  toggleForm = () => {
    this.setState({
      expandForm: !this.state.expandForm,
    });
  };

  // todo search
  handleSearch = ({ current }) => {
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
  };

  renderForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.onSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="项目名称">
              {getFieldDecorator('name')(<Input placeholder="请输入项目名称" />)}
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
    const { list, page, loading, dispatch } = this.props;

    const pagination = {
      ...page,
      showQuickJumper: true,
      showTotal: total => <span>共{total}条</span>,
    };

    return (
      <PageHeaderLayout title="项目列表">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              <Button
                icon="plus"
                type="primary"
                onClick={() => dispatch(routerRedux.push('/project/add'))}
              >
                新建
              </Button>
            </div>
            <Table
              rowKey="projectId"
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
