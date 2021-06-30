import { pactWith } from 'jest-pact';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
// import axios from 'axios';
// import { initializeTestStore } from '../setupTest';
// import { getCourseBlocks } from '../courseware/data/api';
// import { Matchers } from '@pact-foundation/pact';

pactWith({ consumer: 'MyConsumer', provider: 'MyProvider' }, provider => {
  let baseUrl;
  // let courseId;

  beforeEach(async () => {
    baseUrl = provider.mockService.baseUrl;
    // const store = await initializeTestStore({ excludeFetchSequence: true });
    // courseId = store.getState().courseware.courseId;
  });
  describe('Courseware endpoint', () => {
    beforeEach(() => provider.addInteraction({
      uponReceiving: 'A request to fetch course block',
      willRespondWith: {
        status: 400,
        body: {
          courseId: 'course-v1:edX+DemoX+Demo_Course_1',
          hasScheduledContent: false,
          title: 'Demo Course',
          blocks: {
            'block-v1:edX+DemoX+Demo_Course_1+type@course+block@bcdabcdabcdabcdabcdabcdabcdabcd4': {
              type: 'course',
              display_name: 'Demonstration Course',
              children: [Array],
              block_id: 'bcdabcdabcdabcdabcdabcdabcdabcd4',
              complete: false,
              description: null,
              due: null,
              graded: false,
              icon: null,
              showLink: true,
              id: 'block-v1:edX+DemoX+Demo_Course_1+type@course+block@bcdabcdabcdabcdabcdabcdabcdabcd4',
              student_view_url: 'http://localhost:18000/xblock/block-v1:edX+DemoX+Demo_Course_1+type@course+block@bcdabcdabcdabcdabcdabcdabcdabcd4',
              legacy_web_url: 'http://localhost:18000/courses/course-v1:edX+DemoX+Demo_Course_1/jump_to/block-v1:edX+DemoX+Demo_Course_1+type@course+block@bcdabcdabcdabcdabcdabcdabcdabcd4?experience=legacy',
            },
            'block-v1:edX+DemoX+Demo_Course_1+type@chapter+block@bcdabcdabcdabcdabcdabcdabcdabcd3': {
              type: 'chapter',
              children: [Array],
              block_id: 'bcdabcdabcdabcdabcdabcdabcdabcd3',
              complete: false,
              description: null,
              due: null,
              graded: false,
              icon: null,
              showLink: true,
              display_name: 'bcdabcdabcdabcdabcdabcdabcdabcd3',
              id: 'block-v1:edX+DemoX+Demo_Course_1+type@chapter+block@bcdabcdabcdabcdabcdabcdabcdabcd3',
              student_view_url: 'http://localhost:18000/xblock/block-v1:edX+DemoX+Demo_Course_1+type@chapter+block@bcdabcdabcdabcdabcdabcdabcdabcd3',
              legacy_web_url: 'http://localhost:18000/courses/course-v1:edX+DemoX+Demo_Course_1/jump_to/block-v1:edX+DemoX+Demo_Course_1+type@chapter+block@bcdabcdabcdabcdabcdabcdabcdabcd3?experience=legacy',
            },
            'block-v1:edX+DemoX+Demo_Course_1+type@sequential+block@bcdabcdabcdabcdabcdabcdabcdabcd2': {
              type: 'sequential',
              children: [Array],
              block_id: 'bcdabcdabcdabcdabcdabcdabcdabcd2',
              complete: false,
              description: null,
              due: null,
              graded: false,
              icon: null,
              showLink: true,
              display_name: 'bcdabcdabcdabcdabcdabcdabcdabcd2',
              id: 'block-v1:edX+DemoX+Demo_Course_1+type@sequential+block@bcdabcdabcdabcdabcdabcdabcdabcd2',
              student_view_url: 'http://localhost:18000/xblock/block-v1:edX+DemoX+Demo_Course_1+type@sequential+block@bcdabcdabcdabcdabcdabcdabcdabcd2',
              legacy_web_url: 'http://localhost:18000/courses/course-v1:edX+DemoX+Demo_Course_1/jump_to/block-v1:edX+DemoX+Demo_Course_1+type@sequential+block@bcdabcdabcdabcdabcdabcdabcdabcd2?experience=legacy',
            },
            'block-v1:edX+DemoX+Demo_Course_1+type@vertical+block@bcdabcdabcdabcdabcdabcdabcdabcd1': {
              type: 'vertical',
              block_id: 'bcdabcdabcdabcdabcdabcdabcdabcd1',
              complete: false,
              description: null,
              due: null,
              graded: false,
              icon: null,
              showLink: true,
              children: [],
              display_name: 'bcdabcdabcdabcdabcdabcdabcdabcd1',
              id: 'block-v1:edX+DemoX+Demo_Course_1+type@vertical+block@bcdabcdabcdabcdabcdabcdabcdabcd1',
              student_view_url: 'http://localhost:18000/xblock/block-v1:edX+DemoX+Demo_Course_1+type@vertical+block@bcdabcdabcdabcdabcdabcdabcdabcd1',
              legacy_web_url: 'http://localhost:18000/courses/course-v1:edX+DemoX+Demo_Course_1/jump_to/block-v1:edX+DemoX+Demo_Course_1+type@vertical+block@bcdabcdabcdabcdabcdabcdabcdabcd1?experience=legacy',
            },
          },
          root: 'block-v1:edX+DemoX+Demo_Course_1+type@course+block@bcdabcdabcdabcdabcdabcdabcdabcd4',
        },
      },
      withRequest: {
        method: 'GET',
        path: '/api/courses/v2/blocks/',
      },
    }));
    it('returns course blocks', () => getAuthenticatedHttpClient().get(`${baseUrl}/api/courses/v2/blocks/`).then(response => {
      expect(response.title).toEqual('Demo Course');
    }));
  });
});
