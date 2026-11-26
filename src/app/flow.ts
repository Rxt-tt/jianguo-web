/** 制作流程的三个步骤，与 /upload → /scene → /result 一一对应 */
export const FLOW_STEPS = ['上传商品图', '选择场景', '生成物料'] as const;

export const FLOW_STEP_INDEX = {
  upload: 0,
  scene: 1,
  result: 2,
} as const;