import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../Redux-thunk/Actions";
import { bindActionCreators } from "redux";
import moment from "moment";
import { Input, Button, TimePicker, Form, List, Typography } from "antd";
import "antd/dist/antd.css";
import "./todoIndex.css";

const TodoList = (props) => {
  const { allActions, todoListData } = props;
  const [task, setTask] = useState("");
  const [time, setTime] = useState("");
  const [showList, setShowList] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [updateItemData, setUpdateItemData] = useState({});
  const [todoStateData, setTodoStateData] = useState([]);
  console.log("todoListData", todoListData);
  const [form] = Form.useForm();

  useEffect(() => {
    setTodoStateData(todoListData);
  }, [todoListData]);

  const handleSubmit = () => {
    if (isEdit) {
      allActions.updateTodoItem({
        task,
        time,
        id: updateItemData.id,
      });
      setTask("");
      setTime("");
      form.resetFields();
      setShowList(!showList);
      setUpdateItemData({});
    } else {
      allActions.createTodoList({
        task,
        time,
        id: Math.random() * 10,
      });
      setTask("");
      setTime("");
      form.resetFields();
    }
    setIsEdit(false);
  };

  const onFinishFailed = (errorInfo) => {
    // alert(errorInfo);
  };
  const deleteTask = (id) => {
    allActions.deleteTodoItem(id);
  };

  const updateData = (item) => {
    setIsEdit(true);
    setUpdateItemData(item);
    setTask(item.task);
    setTime(item.time);
    setShowList(!showList);
  };
  return (
    <>
      <div className="container">
        <Button
          type="primary"
          onClick={() => setShowList(!showList)}
          disabled={!showList && todoListData.length === 0}
        >
          {showList ? "Add Todo" : "Show List"}
        </Button>
        {!showList && (
          <div className="form-container">
            <Form
              name="basic"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 16 }}
              onFinishFailed={onFinishFailed}
              initialValues={
                isEdit
                  ? {
                      "Task Name": updateItemData.task,
                      "Time Picker": moment(updateItemData.time, "hh:mm A"),
                    }
                  : undefined
              }
              form={form}
              autoComplete="off"
            >
              <Form.Item
                label="Task Name"
                name="Task Name"
                rules={[
                  { required: true, message: "Please input the task name!" },
                ]}
              >
                <Input
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                  placeholder="Enter the task"
                />
              </Form.Item>
              <Form.Item
                label="Time Picker"
                name="Time Picker"
                rules={[
                  {
                    required: true,
                    message: "Please input the time for the task!",
                  },
                ]}
              >
                <TimePicker
                  value={moment(time, "hh:mm A")}
                  use12Hours
                  placeholder="Please Select time"
                  format="hh:mm A"
                  onSelect={(e) => setTime(moment(e).format("hh:mm A"))}
                  allowClear={false}
                />
              </Form.Item>
              <Button type="primary" onClick={handleSubmit}>
                Submit
              </Button>
            </Form>
          </div>
        )}
      </div>
      {showList && (
        <div>
          <List
            header={<div>TODO List</div>}
            footer={<div>End</div>}
            bordered
            style={{ width: "100%", marginTop: "20vh" }}
            dataSource={[...todoStateData]}
            renderItem={(item) => (
              <List.Item key={item.id}>
                <span className="taskListing">
                  {item.task} <br /> task time : {item.time}
                </span>
                <span className="update-btn" onClick={() => updateData(item)}>
                  Update
                </span>
                <span
                  className="delete-btn"
                  onClick={() => deleteTask(item.id)}
                >
                  x
                </span>
              </List.Item>
            )}
          />
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  todoListData: state.todoListData,
});

const mapDispatchToProps = (dispatch) => ({
  allActions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
