import { useOpenApiFpRequest } from "../../Http/useOpenApiRequest";
import { DeviceApi, DeviceSocketApi } from "../../scaffold";
import { useMount } from "ahooks";
import {
  PageContainer,
  ProCard,
  ProDescriptions,
  ProForm,
  ProFormSwitch,
  ProFormText,
} from "@ant-design/pro-components";
import {
  Affix,
  Button,
  Form,
  Input,
  message,
  Modal,
  Steps,
  Table,
  Typography,
} from "antd";
import BreedForm from "../../components/shared/Breed/BreedForm";
import React, { useEffect } from "react";
import Flex from "../../components/shared/Flex";
import { Config } from "../../config";
import { useArray } from "react-hanger";
interface MessageUnit {
  Message: string;
  HexMessage: string;
  Sn?: string;
}
const commands = [
  {
    on: "0B0527E0FF0087D2",
    off: "0B0527E00000C622",
  },
  {
    on: "0B0527E1FF00D612",
    off: "0B0527E1000097E2",
  },
  {
    on: "0B0527E2FF002612",
    off: "0B0527E2000067E2",
  },
  {
    on: "0B0527E3FF0077D2",
    off: "0B0527E300003622",
  },
  {
    on: "0B0527E4FF00C613",
    off: "0B0527E4000087E3",
  },
  {
    on: "0B0527E5FF0097D3",
    off: "0B0527E50000D623",
  },
  {
    on: "0B0527E6FF0067D3",
    off: "0B0527E600002623",
  },
  {
    on: "0B0527E7FF003613",
    off: "0B0527E7000077E3",
  },
  {
    on: "0B0527E8FF000610",
    off: "0B0527E8000047E0",
  },
  {
    on: "0B0527E9FF0057D0",
    off: "0B0527E900001620",
  },
  {
    on: "0B0527EAFF00A7D0",
    off: "0B0527EA0000E620",
  },
  {
    on: "0B0527EBFF00F610",
    off: "0B0527EB0000B7E0",
  },
  {
    on: "0B0527ECFF0047D1",
    off: "0B0527EC00000621",
  },
  {
    on: "0B0527EDFF001611",
    off: "0B0527ED000057E1",
  },
  {
    on: "0B0527EEFF00E611",
    off: "0B0527EE0000A7E1",
  },
  {
    on: "0B0527EFFF00B7D1",
    off: "0B0527EF0000F621",
  },
];
const data = [
  { code: "ZN01", SN: "00601922061500010357" },
  { code: "ZN02", SN: "00601922061500026127" },
  { code: "ZN03", SN: "00601922061500025781" },
  { code: "ZN04", SN: "00601922061500025809" },
  { code: "ZN05", SN: "00601922061500026027" },
  { code: "ZN06", SN: "00601922061500026311" },
  { code: "ZN07", SN: "00601922061500024481" },
  { code: "ZN08", SN: "00601922061500024284" },
  { code: "ZN09", SN: "00601922061500026617" },
  { code: "ZN10", SN: "00601922061500024522" },
  { code: "ZN11", SN: "00601922061500025223" },
  { code: "ZN12", SN: "00601922061500025540" },
  { code: "ZN13", SN: "00601922061500024670" },
  { code: "ZN14", SN: "00601922061500025429" },
  { code: "ZN15", SN: "00601922061500015499" },
  { code: "F04", SN: "00601922061500025085" },
  { code: "F05", SN: "00601922061500025158" },
  { code: "F06", SN: "00601922061500024304" },
  { code: "F07", SN: "00601922061500025341" },
  { code: "F08", SN: "00601922061500024700" },
  { code: "F09", SN: "00601922061500024911" },
  { code: "F10", SN: "00601922061500027599" },
  { code: "F03", SN: "00601922012100009743" },
  { code: "F01", SN: "00601922060200047447" },
  { code: "F02", SN: "00601922012100024936" },
];

export function DeviceTestPage() {
  const msgList = useArray<MessageUnit>([]);
  const listClientsHook = useOpenApiFpRequest(
    DeviceSocketApi,
    DeviceSocketApi.prototype.deviceSocketListClientsGet
  );
  const listDevicesHook = useOpenApiFpRequest(
    DeviceApi,
    DeviceApi.prototype.deviceSearchGet
  );
  const sendCommandHook = useOpenApiFpRequest(
    DeviceSocketApi,
    DeviceSocketApi.prototype.deviceSocketSendCommandPost
  );
  useMount(() => {
    listClientsHook.requestSync({});
    listDevicesHook.requestSync({
      pi: 1,
      ps: 999,
    });
  });
  useEffect(() => {
    const ws = new WebSocket(`ws://${Config.wsHost}:${Config.wsPort}/ws`);

    ws.onopen = () => {
      console.log("opened");
      message.success("实时日志已连接");
    };
    ws.onmessage = (msg) => {
      const unit = JSON.parse(msg.data);
      console.log(unit);
      msgList.push(unit);
    };
    ws.onclose = () => {
      console.log("closed");
      // alert('语音服务已断开，请刷新页面');
    };
    return () => {
      ws.close();
    };
  }, []);
  return (
    <PageContainer title={"设备测试"}>
      <Flex>
        <ProCard title="在线设备">
          <Typography.Text>
            {JSON.stringify(listClientsHook.data)}{" "}
          </Typography.Text>
          <br />
          <Typography.Text>
            {JSON.stringify(
              data
                .filter((i) => listClientsHook.data?.includes(i.SN!))
                .sort((a, b) => (a.code > b.code ? 1 : -1))
            )}
          </Typography.Text>
        </ProCard>
        <ProCard style={{ marginLeft: 16 }}>
          <ProForm
            onFinish={async (values) => {
              console.log(values);
              sendCommandHook
                .request({
                  deviceSendCommandModel: {
                    sn: values.sn,
                    command: values.command,
                  },
                })
                .then((r) => {
                  message.success("提交成功");
                })
                .catch((e) => {
                  message.error(e.message);
                });
            }}
          >
            <ProFormText name="sn" label={"SN 码"} />
            <ProFormText name="command" label={"命令"} />
          </ProForm>
        </ProCard>
        <Affix
          offsetTop={80}
          style={{
            height: 300,
          }}
        >
          <Button
            onClick={() => {
              msgList.clear();
            }}
          >
            清空
          </Button>
          <ProCard
            style={{
              width: 600,
              height: 300,
              marginLeft: 16,
              overflow: "auto",
            }}
            title={"实时日志"}
          >
            <Steps
              current={msgList.value.length - 1}
              progressDot
              direction="vertical"
              items={msgList.value.map((i) => {
                return {
                  title: "收到数据: " + i.Sn,
                  description: i.Message + " 🖥 " + i.HexMessage,
                };
              })}
            />
          </ProCard>
        </Affix>
      </Flex>
      {data.map((i) => (
        <ProCard
          key={i.code}
          style={{ marginTop: 16, position: "relative", zIndex: 9 }}
          title={i.code}
        >
          <ProDescriptions>
            <ProDescriptions.Item label={"SN"}>{i.SN}</ProDescriptions.Item>
          </ProDescriptions>
          <Button.Group>
            <Button
              style={{ marginRight: 8, marginBottom: 8 }}
              type={"primary"}
              onClick={() => {
                sendCommandHook
                  .request({
                    deviceSendCommandModel: {
                      sn: i.SN,
                      command: "060F0000000801FFFF33",
                    },
                  })
                  .then((r) => {
                    message.success("提交成功");
                  })
                  .catch((e) => {
                    message.error(e.message);
                  });
              }}
            >
              打开全部电源
            </Button>
            <Button
              style={{ marginRight: 8, marginBottom: 8 }}
              type={"primary"}
              onClick={() => {
                sendCommandHook
                  .request({
                    deviceSendCommandModel: {
                      sn: i.SN,
                      command: "060f000000080100BF73",
                    },
                  })
                  .then((r) => {
                    message.success("提交成功");
                  })
                  .catch((e) => {
                    message.error(e.message);
                  });
              }}
            >
              关闭全部电源
            </Button>
            <Button
              style={{ marginRight: 8, marginBottom: 8 }}
              type={"primary"}
              onClick={() => {
                sendCommandHook
                  .request({
                    deviceSendCommandModel: {
                      sn: i.SN,
                      command: "06050003FF007D8D",
                    },
                  })
                  .then((r) => {
                    message.success("提交成功");
                  })
                  .catch((e) => {
                    message.error(e.message);
                  });
              }}
            >
              使用 DTU
            </Button>
            <Button
              style={{ marginRight: 8, marginBottom: 8 }}
              type={"primary"}
              onClick={() => {
                sendCommandHook
                  .request({
                    deviceSendCommandModel: {
                      sn: i.SN,
                      command: "0605000300003C7D",
                    },
                  })
                  .then((r) => {
                    message.success("提交成功");
                  })
                  .catch((e) => {
                    message.error(e.message);
                  });
              }}
            >
              使用 LoRA
            </Button>
            <Button
              style={{ marginRight: 8, marginBottom: 8 }}
              type={"primary"}
              onClick={() => {
                sendCommandHook
                  .request({
                    deviceSendCommandModel: {
                      sn: i.SN,
                      command: "06050000FF008D8D",
                    },
                  })
                  .then((r) => {
                    message.success("提交成功");
                  })
                  .catch((e) => {
                    message.error(e.message);
                  });
              }}
            >
              传感器供电
            </Button>
            <Button
              style={{ marginRight: 8, marginBottom: 8 }}
              type={"primary"}
              onClick={() => {
                sendCommandHook
                  .request({
                    deviceSendCommandModel: {
                      sn: i.SN,
                      command: "060500000000CC7D",
                    },
                  })
                  .then((r) => {
                    message.success("提交成功");
                  })
                  .catch((e) => {
                    message.error(e.message);
                  });
              }}
            >
              传感器断电
            </Button>
            <Button
              style={{ marginRight: 8, marginBottom: 8 }}
              type={"primary"}
              onClick={() => {
                sendCommandHook
                  .request({
                    deviceSendCommandModel: {
                      sn: i.SN,
                      command: "06050001FF00DC4D",
                    },
                  })
                  .then((r) => {
                    message.success("提交成功");
                  })
                  .catch((e) => {
                    message.error(e.message);
                  });
              }}
            >
              水泵通电
            </Button>
            <Button
              style={{ marginRight: 8, marginBottom: 8 }}
              type={"primary"}
              onClick={() => {
                sendCommandHook
                  .request({
                    deviceSendCommandModel: {
                      sn: i.SN,
                      command: "0605000100009DBD",
                    },
                  })
                  .then((r) => {
                    message.success("提交成功");
                  })
                  .catch((e) => {
                    message.error(e.message);
                  });
              }}
            >
              水泵断电
            </Button>
            <Button
              style={{ marginRight: 8, marginBottom: 8 }}
              type={"primary"}
              onClick={() => {
                sendCommandHook
                  .request({
                    deviceSendCommandModel: {
                      sn: i.SN,
                      command: "0B0127E00020363A",
                    },
                  })
                  .then((r) => {
                    message.success("提交成功");
                  })
                  .catch((e) => {
                    message.error(e.message);
                  });
              }}
            >
              查询设备状态
            </Button>
          </Button.Group>
          <br />
          {Array(16)
            .fill(0)
            .map((_, index) => (
              <Button.Group
                style={{ marginRight: 8, marginBottom: 8 }}
                key={index}
              >
                <Button
                  type={"primary"}
                  onClick={() => {
                    sendCommandHook
                      .request({
                        deviceSendCommandModel: {
                          sn: i.SN,
                          command: commands[index].on,
                        },
                      })
                      .then((r) => {
                        message.success("提交成功");
                      })
                      .catch((e) => {
                        message.error(e.message);
                      });
                  }}
                >
                  设备 {index} 打开
                </Button>
                <Button
                  danger
                  type={"primary"}
                  onClick={() => {
                    sendCommandHook
                      .request({
                        deviceSendCommandModel: {
                          sn: i.SN,
                          command: commands[index].off,
                        },
                      })
                      .then((r) => {
                        message.success("提交成功");
                      })
                      .catch((e) => {
                        message.error(e.message);
                      });
                  }}
                >
                  设备 {index} 关闭
                </Button>
              </Button.Group>
            ))}
        </ProCard>
      ))}
    </PageContainer>
  );
}
