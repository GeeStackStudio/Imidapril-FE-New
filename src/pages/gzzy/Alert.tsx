import { AlertTableCtrl } from "../../components/shared/Alert/AlertTable.Ctrl";
import { PageContainer, ProCard } from "@ant-design/pro-components";
import React from "react";

export function AlertPage() {
  return (
    <PageContainer>
      <ProCard>
        <AlertTableCtrl />
      </ProCard>
    </PageContainer>
  );
}
