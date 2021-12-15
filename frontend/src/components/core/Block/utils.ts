/**
 * @license
 * Copyright 2018-2021 Streamlit Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { ScriptRunState } from "src/lib/ScriptRunState"
import { ReportNode } from "src/lib/ReportNode"
import { FormsData, WidgetStateManager } from "src/lib/WidgetStateManager"
import { FileUploadClient } from "src/lib/FileUploadClient"
import { ComponentRegistry } from "src/components/widgets/CustomComponent/"

export function shouldComponentBeEnabled(
  isHidden: boolean,
  scriptRunState: ScriptRunState
): boolean {
  return !isHidden || scriptRunState !== ScriptRunState.RUNNING
}

export function isElementStale(
  node: ReportNode,
  scriptRunState: ScriptRunState,
  sessionId: string
): boolean {
  if (scriptRunState === ScriptRunState.RERUN_REQUESTED) {
    // If a rerun was just requested, all of our current elements
    // are about to become stale.
    return true
  }
  if (scriptRunState === ScriptRunState.RUNNING) {
    return node.sessionId !== sessionId
  }
  return false
}

export function isComponentStale(
  enable: boolean,
  node: ReportNode,
  showStaleElementIndicator: boolean,
  scriptRunState: ScriptRunState,
  sessionId: string
): boolean {
  return (
    !enable ||
    (showStaleElementIndicator &&
      isElementStale(node, scriptRunState, sessionId))
  )
}

export interface BaseBlockProps {
  sessionId: string
  scriptRunState: ScriptRunState
  showStaleElementIndicator: boolean
  widgetMgr: WidgetStateManager
  uploadClient: FileUploadClient
  widgetsDisabled: boolean
  componentRegistry: ComponentRegistry
  formsData: FormsData
}
