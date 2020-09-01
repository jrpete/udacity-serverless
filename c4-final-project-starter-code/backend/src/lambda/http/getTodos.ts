import 'source-map-support/register';
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda';
import { getTodos } from '../../helpers/Todos';
import { getUserId} from "../utils";
import { createLogger } from '../../utils/logger'

const logger = createLogger('getTodos')


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  logger.info('Received Event', event)
  

  const userId = getUserId(event);
  logger.info('Decoded User Id: ', userId)

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      items: await getTodos(event)
    })
  };
}