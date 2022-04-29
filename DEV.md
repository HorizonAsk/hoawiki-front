## run

如在本地开发，应设置启动环境变量`ApiUrl="http://localhost:8085/api"`以连接到后端（假定后端使用8085端口）

## release

执行 `yarn run release`，即可按照semantic version进行git tag和changelog迭代，并修订package.json的版本号。