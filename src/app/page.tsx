"use client";

import { useState, useEffect, useCallback } from "react";
import { Patient, ApiResponse } from "@/lib/types";
import { PatientCard } from "@/components/PatientCard";
import { PatientRow } from "@/components/PatientRow";
import { SearchInput } from "@/components/SearchInput";
import { SortControls } from "@/components/SortControls";
import { FilterControls } from "@/components/FilterControls";
import { MedicalPagination } from "@/components/MedicalPagination";
import { FilterChip } from "@/components/FilterChip";
import { Loader2, ListFilterPlus } from "lucide-react";

export default function Home() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State for filters and pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("medical_issue");
  const [filterValue, setFilterValue] = useState("");
  const [sortBy, setSortBy] = useState("patient_id");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage] = useState(8);
  const [view, setView] = useState<"row" | "card">("row");

  // Fetch patients from API
  const fetchPatients = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
        search: searchTerm,
        sortBy,
        sortOrder,
        filterBy,
        filterValue,
      });

      const response = await fetch(`/api/patients?${params}`);

      if (!response.ok) {
        throw new Error("Failed to fetch patients");
      }

      const data: ApiResponse = await response.json();
      setPatients(data.patients);
      setTotalPages(Math.ceil(data.total / itemsPerPage));
      setTotalItems(data.total);
      setCurrentPage(data.page);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, [
    currentPage,
    itemsPerPage,
    searchTerm,
    sortBy,
    sortOrder,
    filterBy,
    filterValue,
  ]);

  // Effect to fetch patients when filters change
  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  // Reset page to 1 when filters change (except pagination)
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterBy, filterValue, sortBy, sortOrder]);

  // Handlers for user interactions
  const handleSearch = (search: string) => {
    setSearchTerm(search);
  };

  const handleSort = (sortBy: string, sortOrder: "asc" | "desc") => {
    setSortBy(sortBy);
    setSortOrder(sortOrder);
  };

  const handleFilter = (filterBy: string, filterValue: string) => {
    setFilterBy(filterBy);
    setFilterValue(filterValue);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRemoveFilter = () => {
    setFilterBy("medical_issue");
    setFilterValue("");
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (searchTerm) count++;
    if (filterValue) count++;
    return count;
  };

  const getFilterLabel = () => {
    if (filterBy === "medical_issue" && filterValue) {
      return `Medical Issue: ${filterValue}`;
    } else if (filterBy === "age_range" && filterValue) {
      const rangeLabels = {
        young: "Age: 0-29",
        adult: "Age: 30-59",
        senior: "Age: 60+",
      };
      return rangeLabels[filterValue as keyof typeof rangeLabels] || "";
    }
    return "";
  };

  return (
    <div className="page-background">
      {/* Header Section */}
      <div className="medical-header">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Patient Directory</h1>
              <p className="text-xl opacity-90">
                {totalItems} Patient{totalItems !== 1 ? "s" : ""} Found
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* View Toggle Section */}
      <div className="view-toggle-container flex items-center justify-between">
        <div className="max-w-7xl">
          <button
            onClick={() => setView("row")}
            className={`view-toggle-btn ${view === "row" ? "active" : ""}`}
          >
            Table View
          </button>
          <button
            onClick={() => setView("card")}
            className={`view-toggle-btn ${view === "card" ? "active" : ""}`}
          >
            Card View
          </button>
        </div>

        <div className="text-sm text-gray-600 mb-1 flex items-center gap-2 pr-15">
          <ListFilterPlus className="w-4 h-4" />
          Active Filters {getActiveFiltersCount()}
        </div>
      </div>

      {/* Search & Filters Section */}
      <div className="search-filters-container">
        <div className="mx-auto w-full flex flex-wrap items-center justify-between">
          <div className="search-section mr-2">
            <SearchInput onSearch={handleSearch} placeholder="Search" />
          </div>
          <div className="ml-3 mr-1 text-blue-500 font-bold">Filters:</div>
          <div>
            <FilterControls
              onFilter={handleFilter}
              currentFilterBy={filterBy}
              currentFilterValue={filterValue}
            />
          </div>
        </div>
      </div>


      {/* Filter Chips */}
      <div className="filter-chips ml-6">
        {searchTerm && (
          <FilterChip
            label={`Search: ${searchTerm}`}
            onRemove={() => setSearchTerm("")}
          />
        )}
        {filterValue && (
          <FilterChip label={getFilterLabel()} onRemove={handleRemoveFilter} />
        )}
      </div>

      {/* Sort Controls */}
      <div className="sort-controls ml-6 my-5">
        <SortControls
          onSort={handleSort}
          currentSortBy={sortBy}
          currentSortOrder={sortOrder}
        />
      </div>

      {/* Patient Cards Grid */}
      <div className="max-w-7xl mx-auto">
        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            <p className="font-medium">Error: {error}</p>
            <button
              onClick={fetchPatients}
              className="mt-2 text-red-600 hover:text-red-800 underline"
            >
              Try again
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="text-center">
              <Loader2 className="w-12 h-12 animate-spin mx-auto text-blue-500 mb-4" />
              <p className="text-gray-600">Loading patients...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Patient Grid */}
            {patients.length > 0 ? (
              view === "card" ? (
                <div className="patient-grid">
                  {patients.map((patient) => (
                    <PatientCard key={patient.patient_id} patient={patient} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">
                          ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider ">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">
                          Age
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">
                          Medical Issue
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">
                          Address
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">
                          Phone Number
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">
                          Email ID
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {patients.map((patient) => (
                        <PatientRow
                          key={patient.patient_id}
                          patient={patient}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              )
            ) : (
              <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                <p className="text-gray-500 text-lg">
                  No patients found matching your criteria.
                </p>
                <p className="text-gray-400 mt-2">
                  Try adjusting your search or filters.
                </p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <MedicalPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
