"use client";

import { usePathname } from "next/navigation";
import { BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";
import { toTitleCase } from "@/lib/utils";
import { Fragment } from "react";

export default function AesteriskBreadcrumb() {
	const pathname = usePathname();
	const base = `${pathname}`.split("/").slice(0, 3);
	const paths = `${pathname}`.split("/").slice(3);
	if(paths.length < 1) paths.push("");

	const getPath = (index: number) => `${base.join("/")}/${paths.slice(0, index + 1).join("/")}`;

	return (
		<>
			{
				paths.map((path, index) => {
					if(index === 0) {
						return (
							<Fragment key={`breadcrumb-${path}-${index}`}>
								<BreadcrumbItem>
									<BreadcrumbLink asChild>
										<Link href={getPath(index)}>
											{ path.length < 1 ? "Dashboard" : toTitleCase(path) }
										</Link>
									</BreadcrumbLink>
								</BreadcrumbItem>
								{ paths.length - 1 > index && <BreadcrumbSeparator /> }
							</Fragment>
						);
					}

					if(paths.length > 3 && index < paths.length - 2) {
						return (
							<Fragment key={`breadcrumb-${path}-${index}`}>
								<BreadcrumbItem>
									<BreadcrumbEllipsis />
								</BreadcrumbItem>
								{ paths.length - 1 > index && <BreadcrumbSeparator /> }
							</Fragment>
						);
					}

					return (
						<Fragment key={`breadcrumb-${path}-${index}`}>
							<BreadcrumbItem>
								<BreadcrumbLink asChild>
									<Link href={getPath(index)}>
										{ toTitleCase(path) }
									</Link>
								</BreadcrumbLink>
							</BreadcrumbItem>
							{ paths.length - 1 > index && <BreadcrumbSeparator /> }
						</Fragment>
					);
				})
			}
		</>
	);
}
