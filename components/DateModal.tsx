"use client"
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { Launch } from '@/lib/types'
import { Calendar } from './ui/calendar'
import { addDays } from 'date-fns'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/redux/store'

const DateModal = ({
  setOpenModal,
  openModal,
  setFilteredData
}: {
  setOpenModal(open: boolean): void,
  openModal: boolean,
  setFilteredData: (filtered: Launch[]) => void
}) => {
  const [filterOption, setFilterOption] = useState(0)
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [date2, setDate2] = useState<Date | undefined>(undefined)
  const { allLaunches } = useSelector((state: RootState) => state.launch);

  const filterLaunchData = () => {
    let filtered: Launch[] = []

    if (date && date2) {
        console.log("date 1",date);
        console.log("date 2",date2);

      // Filter between selected custom range
      filtered = allLaunches.filter((launch:Launch) => {
        const launchDate = new Date(launch.static_fire_date_utc!)
        return launchDate >= date && launchDate <= date2
      })
    } else {
      const now = new Date()
      let startDate: Date = now

      switch (filterOption) {
        case 1: // Past week
          startDate = addDays(now, -7)
          break
        case 2: // Past month
          startDate = addDays(now, -30)
          break
        case 3: // Past 3 months
          startDate = addDays(now, -90)
          break
        case 4: // Past 6 months
          startDate = addDays(now, -180)
          break
        case 5: // Past year
          startDate = addDays(now, -365)
          break
        case 6: // Past 2 years
          startDate = addDays(now, -730)
          break
        default:
          startDate = addDays(now, -365 * 5) // fallback: show everything
          break
      }

      filtered = allLaunches.filter((launch:Launch) => {
        const launchDate = new Date(launch.static_fire_date_utc!)
        return launchDate >= startDate && launchDate <= now
      })
    }

    setFilteredData(filtered)
    setOpenModal(false)
  }

  return (
    <Dialog onOpenChange={setOpenModal} open={openModal}>
        <DialogContent className="bg-white px-6 py-8 w-11/12 mx-auto">
            <div className="mb-4">
                {date && date2 ? (
                <div className="text-sm text-gray-700 font-medium">
                    Selected Range:{" "}
                    <span className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded-md">
                    {date.toDateString()} ➝ {date2.toDateString()}
                    </span>
                </div>
                ) : filterOption !== 0 ? (
                <div className="text-sm text-gray-700 font-medium">
                    Selected Filter:{" "}
                    <span className="inline-block bg-green-100 text-green-700 px-2 py-1 rounded-md">
                    {(() => {
                        switch (filterOption) {
                        case 1:
                            return "Past Week"
                        case 2:
                            return "Past Month"
                        case 3:
                            return "Past 3 Months"
                        case 4:
                            return "Past 6 Months"
                        case 5:
                            return "Past Year"
                        case 6:
                            return "Past 2 Years"
                        default:
                            return ""
                        }
                    })()}
                    </span>
                </div>
                ) : (
                <div className="text-sm text-gray-500">No filter selected</div>
                )}
            </div>

            <div className="flex flex-row gap-x-6">
                <div className="flex flex-col gap-y-2">
                    <button className= {`${(filterOption===1) && "text-blue-400"}`} onClick={() => setFilterOption(1)}>Past Week</button>
                    <button className= {`${(filterOption===2) && "text-blue-400"}`} onClick={() => setFilterOption(2)}>Past Month</button>
                    <button className= {`${(filterOption===3) && "text-blue-400"}`} onClick={() => setFilterOption(3)}>Past 3 Months</button>
                    <button className= {`${(filterOption===4) && "text-blue-400"}`} onClick={() => setFilterOption(4)}>Past 6 Months</button>
                    <button className= {`${(filterOption==5) && "text-blue-400"}`} onClick={() => setFilterOption(5)}>Past Year</button>
                    <button className= {`${(filterOption===6) && "text-blue-400"}`} onClick={() => setFilterOption(6)}>Past 2 Years</button> 
                </div>

                <div className="flex flex-col md:flex-row gap-4 mt-4">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border shadow-sm"
                    captionLayout="dropdown"
                />
                <Calendar
                    mode="single"
                    selected={date2}
                    onSelect={setDate2}
                    className="rounded-md border shadow-sm"
                    captionLayout="dropdown"
                />
                </div>
            </div>

            <div className="mt-4 text-right">
                <button
                onClick={filterLaunchData}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                Apply Filter
                </button>
            </div>
        </DialogContent>

    </Dialog>
  )
}

export default DateModal
