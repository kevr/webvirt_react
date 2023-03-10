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
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { setVirtDomain } from "../../store/Actions";
import { Table, TBody, Row, Column } from "../Table";
import Checkbox from "../Checkbox";
import { VIR_DOMAIN_RUNNING } from "../../API";

const Boot = ({ domain }) => {
  const dispatch = useDispatch();

  return (
    <Table>
      <TBody>
        <Row>
          <Column className="checkbox-column">
            <Checkbox
              data-testid="autostart-checkbox"
              endpoint={`domains/${domain.name.text}/autostart`}
              checked={domain.autostart || false}
              disabled={domain.autostart === undefined}
              label="Autostart"
              onChange={(data) => {
                dispatch(setVirtDomain(Object.assign({}, domain, data)));
              }}
            />
          </Column>
        </Row>
        <Row>
          <Column className="checkbox-column">
            <Checkbox
              data-testid="bootmenu-checkbox"
              endpoint={`domains/${domain.name.text}/bootmenu`}
              checked={domain.os.bootmenu.attrib.enable === "yes"}
              label="Enable boot menu"
              disabled={domain.state.attrib.id === VIR_DOMAIN_RUNNING}
              disabledText="disabled while running"
              onChange={(data) => {
                dispatch(
                  setVirtDomain(
                    Object.assign({}, domain, {
                      os: data,
                    })
                  )
                );
              }}
            />
          </Column>
        </Row>
      </TBody>
    </Table>
  );
};

Boot.propTypes = {
  domain: PropTypes.object.isRequired,
};

export default Boot;
