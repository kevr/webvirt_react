/*
 * Copyright 2023 Kevin Morris
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
 * implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */
import { Table, THead, TBody, Row, Header, Column } from "../Table";

const DiskRow = ({ disk }) => (
  <Row data-testid="disk">
    <Column>{disk.driver.type}</Column>
    <Column>{disk.target.bus}</Column>
    <Column>{`/dev/${disk.target.dev}`}</Column>
    <Column>{disk.source.file.split("/").at(-1)}</Column>
  </Row>
);

const Storage = ({ domain }) => {
  let disks = [];
  if (domain.info) {
    disks = domain.info.devices.disks.filter((disk) => disk.device === "disk");
  }

  return (
    <Table>
      <THead>
        <Row>
          <Header>Driver</Header>
          <Header>Bus</Header>
          <Header>Target</Header>
          <Header>Source</Header>
        </Row>
      </THead>

      <TBody>
        {disks.map((disk, index) => (
          <DiskRow key={index} disk={disk} />
        ))}
      </TBody>
    </Table>
  );
};

export default Storage;
