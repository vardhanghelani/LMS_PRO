'use client';

import * as React from "react";
import { motion } from "framer-motion";
import { ChevronUp, ChevronDown, Search, Filter } from "lucide-react";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { cn } from "@/app/lib/utils";
import { tableRowVariants } from "@/app/lib/motion";

export interface Column<T> {
  key: keyof T;
  title: string;
  sortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
  width?: string;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  searchable?: boolean;
  filterable?: boolean;
  loading?: boolean;
  emptyMessage?: string;
  className?: string;
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  searchable = true,
  filterable = true,
  loading = false,
  emptyMessage = "No data available",
  className,
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [sortConfig, setSortConfig] = React.useState<{
    key: keyof T | null;
    direction: 'asc' | 'desc';
  }>({ key: null, direction: 'asc' });

  const filteredData = React.useMemo(() => {
    if (!searchTerm) return data;
    return data.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [data, searchTerm]);

  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return filteredData;
    
    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key!];
      const bValue = b[sortConfig.key!];
      
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);

  const handleSort = (key: keyof T) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  if (loading) {
    return (
      <Card variant="nova" padding="lg" className={className}>
        <div className="space-y-4">
          <div className="h-8 bg-muted rounded w-48 animate-pulse"></div>
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-muted rounded animate-pulse"></div>
            ))}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card variant="nova" padding="lg" className={className}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h3 className="text-xl font-semibold text-foreground">Data Table</h3>
          <Badge variant="nova" className="text-xs">
            {sortedData.length} items
          </Badge>
        </div>
        
        <div className="flex items-center gap-2">
          {searchable && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
                variant="nova"
              />
            </div>
          )}
          
          {filterable && (
            <Button variant="ghost" size="icon" className="rounded-xl">
              <Filter className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/50">
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className={cn(
                    "text-left py-3 px-4 font-medium text-muted-foreground",
                    column.sortable && "cursor-pointer hover:text-foreground transition-colors"
                  )}
                  style={{ width: column.width }}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center gap-2">
                    {column.title}
                    {column.sortable && (
                      <div className="flex flex-col">
                        <ChevronUp 
                          className={cn(
                            "h-3 w-3 transition-colors",
                            sortConfig.key === column.key && sortConfig.direction === 'asc' 
                              ? "text-nova-primary" 
                              : "text-muted-foreground"
                          )}
                        />
                        <ChevronDown 
                          className={cn(
                            "h-3 w-3 -mt-1 transition-colors",
                            sortConfig.key === column.key && sortConfig.direction === 'desc' 
                              ? "text-nova-primary" 
                              : "text-muted-foreground"
                          )}
                        />
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-12">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                      <Search className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground">{emptyMessage}</p>
                  </div>
                </td>
              </tr>
            ) : (
              sortedData.map((row, index) => (
                <motion.tr
                  key={index}
                  className="border-b border-border/30 hover:bg-muted/50 transition-colors duration-200"
                  variants={tableRowVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  transition={{ delay: index * 0.05 }}
                >
                  {columns.map((column) => (
                    <td key={String(column.key)} className="py-4 px-4">
                      {column.render 
                        ? column.render(row[column.key], row)
                        : String(row[column.key] || '-')
                      }
                    </td>
                  ))}
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
