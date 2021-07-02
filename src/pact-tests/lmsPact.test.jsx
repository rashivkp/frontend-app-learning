import { Pact, Matchers } from '@pact-foundation/pact';
import path from 'path';
// import { getConfig } from '@edx/frontend-platform';
// import axios from 'axios';
import { initializeTestStore } from '../setupTest';
import { getCourseBlocks } from '../courseware/data/api';

const { somethingLike: like } = Matchers;

describe('Courseware Service', () => {
  const provider = new Pact({
    consumer: 'consumer',
    provider: 'provider',
    log: path.resolve(process.cwd(), 'logs', 'pact.log'),
    dir: path.resolve(process.cwd(), 'pacts'),
    logLevel: 'INFO',
  });
  let port;
  let courseId;
  beforeAll(async () => {
    const store = await initializeTestStore({ excludeFetchSequence: true });
    courseId = store.getState().courseware.courseId;
    await provider
      .setup()
      .then((options) => {
        port = options.port;
      });
  });
  describe('When a request for fetch course is made', () => {
    beforeAll(async () => {
      provider.addInteraction({
        uponReceiving: 'a request to fetch course',
        withRequest: {
          method: 'GET',
          path: '/api/courses/v2/blocks/',
        },
        willRespondWith: {
          status: 200,
          data:
          {
            root: 'block-v1:edX+DemoX+Demo_Course+type@course+block@course',
            blocks: {
              'block-v1:edX+DemoX+Demo_Course+type@course+block@course': {
                id: 'block-v1:edX+DemoX+Demo_Course+type@course+block@course',
                block_id: 'course',
                lms_web_url: like('/courses/course-v1:edX+DemoX+Demo_Course/jump_to/block-v1:edX+DemoX+Demo_Course+type@course+block@course'),
                legacy_web_url: like('/courses/course-v1:edX+DemoX+Demo_Course/jump_to/block-v1:edX+DemoX+Demo_Course+type@course+block@course?experience=legacy'),
                student_view_url: like('/xblock/block-v1:edX+DemoX+Demo_Course+type@course+block@course'),
                type: 'course',
                display_name: 'Demonstration Course',
              },
            },
          },
        },
      });
    });
    it('should return the correct data', async () => {
      const url = new URL(`http://localhost:${port}/api/courses/v2/blocks/`);
      // console.log(url.href);
      // console.log(provider.mockServer.baseUrl);
      // const response = await getAuthenticatedHttpClient().get(url.href, {});
      const response = await getCourseBlocks(courseId, url);
      // console.log(response);
      expect(response).toBeTruthy();
    });
    afterEach(() => provider.verify());
    afterAll(() => provider.finalize());
  });
});
