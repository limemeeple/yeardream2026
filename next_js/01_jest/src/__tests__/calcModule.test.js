//test()        : 특정한 테스트 단위
//expect()      : 테스트 실행
//describe()    : test() 의 group, describe는 describe를 담을 수 있다.

import {divide, minus, multiply, plus} from "@/app/calcModule";

describe("사직연산테스트", function (){
    test("더하기 모듈 테스트",function(){
        expect(plus(10,30)).toBe(40);
    });
    test("빼기 모듈 테스트",function(){
        expect(minus(40,10)).toBe(30);
    });
    test("곱하기 모듈 테스트",function(){
        expect(multiply(5,3)).toBe(15);
    });
    test("나누기 모듈 테스트",function(){
        expect(divide(100,10)).toBe(10);
    });
});

/*
    toBe() : 숫자, 문자, 블리언 타입의 값이 일치.
    toEqual() : 객체나 배열의 일치
    toContain() : 배열이나 문자열 내에 특정 값 포함 여부
    toMatch() : 문자열이 지정된 정규표현식 매턴에 일치하는지
    toThrow() : 특정 에러가 발생하는지 여부
 */