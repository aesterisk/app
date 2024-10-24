"use client";

import { Node } from "@/lib/types/node";
import { ColumnDef } from "@tanstack/react-table";
import {
	DropdownMenu,
	DropdownMenuContent, DropdownMenuItem,
	DropdownMenuLabel, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

export const columns: ColumnDef<Node>[] = [
	{
		id: "status",
		header: "Status",
		cell: ({ row }) => {
			const online = row.original.lastActive * 1000 > Date.now() - 60_000_000;

			return (
				<div className="flex items-center relative">
					<div className={cn("absolute left-1 rounded-full bg-rose-300 w-2 h-2", online && "bg-emerald-300")} />
					<div className={cn("absolute left-0 rounded-full bg-rose-300/50 w-4 h-4", online && "bg-emerald-300/50")} />
					<span className="absolute left-6">{ online ? "Online" : "Offline" }</span>
				</div>
			);
		},
		size: 1,
		maxSize: 1,
	},
	{
		accessorKey: "id",
		header: "ID",
		size: 1,
		maxSize: 1,
	},
	{
		accessorKey: "name",
		header: "Name",
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const node = row.original;

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">{ "Open actions menu" }</span>
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>{ "Actions" }</DropdownMenuLabel>
						<DropdownMenuItem onClick={() => navigator.clipboard.writeText(node.id.toString())}>{ "Copy Node ID" }</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
