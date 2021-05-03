import authorise from "../middleware/authorise";

describe("authorise middleware", () => {
  let mockRequest;
  let mockResponse;
  let nextFunction = jest.fn();

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      json: jest.fn(),
    };
  });

  test("without headers", async () => {
    const expectedResponse = {
      error: "No token given, authorisation denied",
    };
    authorise(mockRequest, mockResponse, nextFunction);

    expect(mockResponse.json).toBeCalledWith(expectedResponse);
  });

  test('without "jwt_token" header', async () => {
    const expectedResponse = {
      error: "No token given, authorisation denied",
    };
    mockRequest = {
      headers: {},
    };
    authorise(mockRequest, mockResponse, nextFunction);

    expect(mockResponse.json).toBeCalledWith(expectedResponse);
  });

  test('with "jwt_token" header', async () => {
    mockRequest = {
      headers: {
        jwt_token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo2fSwiaWF0IjoxNjIwMDc2ODA3LCJleHAiOjE2MjAxNjMyMDd9.S_Z_E_Gw-3TNd4GKrtDnQGKVxTDr6Kkan77V6TygQs8",
      },
    };
    authorise(mockRequest, mockResponse, nextFunction);

    expect(nextFunction).toBeCalledTimes(1);
  });
});
