"use client";

import { createRef, ReactNode, RefObject, useRef } from "react";
import { cn } from "@/lib/utils";

type Props = {
	items: {
		id: string;
		card: ReactNode;
	}[];
	className?: string;
};

export default function DashboardGrid({ items, className }: Props) {
	const refs = useRef<{ [key: string]: RefObject<any>; }>({});

	if(Object.keys(refs.current).length !== items.length) {
		items.forEach(({ id }) => {
			refs.current[id] ||= createRef();
		});
	}

	return (
		<div className={cn("grid grid-cols-4 gap-4", className)}>
			{
				items.map((item) => (
					<div ref={refs.current[item.id]} key={item.id} className="col-span-1">
						{ item.card }
					</div>
				))
			}
		</div>
	);
}
