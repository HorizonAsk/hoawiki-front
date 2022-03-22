export enum ApiResponse {
  // 操作成功 20XXX
  /**
   * 操作成功！
   */
  API_RESPONSE_SUCCESS = 20000,

  // 新增数据成功 202XX
  /**
   * 用户创建成功！
   */
  API_RESPONSE_USER_CREATED = 20101,

  /**
   * 内容创建成功！
   */
  API_RESPONSE_CONTENT_CREATED = 20102,

  // 权限成功 201XX
  /**
   * 退出成功！
   */
  API_RESPONSE_LOGOUT = 20201,

  // 客户端过程中问题 40XXX
  /**
   * 请求异常！
   */
  API_RESPONSE_BAD_REQUEST = 40000,

  // 无法鉴权问题 401XX
  /**
   * 请先登录！
   */
  API_RESPONSE_UNAUTHORIZED = 40100,

  // 缺少权限问题 403XX
  /**
   * 权限不足！
   */
  API_RESPONSE_ACCESS_DENIED = 40300,
  /**
   * 当前用户已被锁定，请联系管理员解锁！
   */
  API_RESPONSE_USER_DISABLED = 40301,
  /**
   * 用户已存在！
   */
  API_RESPONSE_USER_EXISTED = 40311,
  /**
   * 内容已存在！
   */
  API_RESPONSE_CONTENT_EXISTED = 40321,

  // 请求内容错误 404XX
  /**
   * 请求不存在！
   */
  API_RESPONSE_REQUEST_NOT_FOUND = 40400,

  // 请求方式越权 405XX
  /**
   * 请求方式不支持！
   */
  API_RESPONSE_HTTP_BAD_METHOD = 40500,

  // 请求参数问题 406XX
  /**
   * 参数不符合要求！
   */
  API_RESPONSE_PARAM_BAD = 40600,
  /**
   * 参数不能为空！
   */
  API_RESPONSE_PARAM_NOT_NULL = 40601,
  /**
   * 用户名或密码错误！
   */
  API_RESPONSE_USERNAME_PASSWORD_ERROR = 40602,

  // 服务器过程中问题 50XXX
  /**
   * 操作异常！
   */
  API_RESPONSE_ERROR = 50000,

  // 权限识别问题 501XX
  /**
   * token 已过期，请重新登录！
   */
  API_RESPONSE_TOKEN_EXPIRED = 50102,
  /**
   * token 解析失败，请尝试重新登录！
   */
  API_RESPONSE_TOKEN_PARSE_ERROR = 50103,

  // 权限操作问题 502XX
  /**
   * 当前用户已在别处登录，请尝试更改密码或重新登录！
   */
  API_RESPONSE_TOKEN_OUT_OF_CTRL = 50201,
  /**
   * 无法手动踢出自己，请尝试退出登录操作！
   */
  API_RESPONSE_KICKOUT_SELF = 50201,

  // 数据库过程问题 503XX
  API_RESPONSE_DATABASE_ERROR = 50300,
}
