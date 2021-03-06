// <reference "cypress" />
import { mountHook } from '@cypress/react';
import { RefObject, useCustomRef } from './useCustomRef';

describe('useCustomRef', () => {
	it('works', () => {
		mountHook(() => useCustomRef(null)).then((res: any) => {
			const { current: ref }: { current: RefObject<any> } = res;

			expect(ref.current).to.be.null;
		});
	});
	it('sets the value correctly', () => {
		const value = Symbol('Some value');

		mountHook(() => useCustomRef<typeof value>(null)).then((res: any) => {
			res.current.updateRef(value);

			expect(res.current.current).to.eq(value);
		});
	});
});
