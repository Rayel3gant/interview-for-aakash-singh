import React from 'react'
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { singleLaunch } from '@/lib/types';

const LaunchModal = ({setOpenModal , data , openModal} : {
    setOpenModal:(open: boolean) => void; data:singleLaunch ; openModal : boolean
}) => {
  console.log("data recieved",data)
  return (
    <div>
        <Dialog onOpenChange={setOpenModal} open={openModal}>
            <DialogContent className='bg-white border-0 w-11/12 md:w-[600px] py-8'>
                <div className='bg-white w-11/12 mx-auto'>
                  <div className='flex gap-x-4 '>
                    <img src={data.image} alt='iamge' width={72} height={72}/>
                    <div>
                      <div className='flex gap-x-2 items-center'>
                        <div className='text-[#1F2937] uppercase font-semibold text-sm md:text-lg'>{data.name}</div>
                        <div>{data.success}</div>
                      </div>

                      <div className='text-[#374151] text-xs'>{data.rocket}</div>
                    </div>
                  </div>

                  <div className='text-[#1F2937] text-xs md:text-[14px] mt-6'>
                    {data.details}
                  </div>

                  <div className='flex flex-col gap-y-3 mt-4'>
                    <div className='w-full flex items-center justify-between text-[10px]  md:text-[14px] text-[#4B5563] border-b-[0.25px] border-b-[#1F2937] pb-2'>
                      <div className='font-semibold'>Flight Number</div>
                      <div>{data.flightNumber}</div>
                    </div>

                    <div className='w-full flex items-center justify-between text-[10px]  md:text-[14px] text-[#4B5563] border-b-[0.25px] border-b-[#1F2937] pb-2'>
                      <div className='font-semibold' >Mission Name</div>
                      <div>{data.name}</div>
                    </div>

                    <div className='w-full flex items-center justify-between text-[10px]  md:text-[14px] text-[#4B5563] border-b-[0.25px] border-b-[#1F2937] pb-2'>
                      <div className='font-semibold'>Rocket Type</div>
                      <div>{data.rocketType}</div>
                    </div>
                    <div className='w-full flex items-center justify-between text-[10px]  md:text-[14px] text-[#4B5563] border-b-[0.25px] border-b-[#1F2937] pb-2'>
                      <div className='font-semibold'>Rocket Name</div>
                      <div>{data.rocket}</div>
                    </div>

                    <div className='w-full flex items-center justify-between text-[10px]  md:text-[14px] text-[#4B5563] border-b-[0.25px] border-b-[#1F2937] pb-2'>
                      <div className='font-semibold'>Manufacturer</div>
                      <div>{data.manufacturer}</div>
                    </div>

                    <div className='w-full flex items-center justify-between text-[10px]  md:text-[14px] text-[#4B5563] border-b-[0.25px] border-b-[#1F2937] pb-2'>
                      <div className='font-semibold'>Nationality</div>
                      <div>{data.nationality}</div>
                    </div>
                    <div className='w-full flex items-center justify-between text-[10px]  md:text-[14px] text-[#4B5563] border-b-[0.25px] border-b-[#1F2937] pb-2'>
                      <div className='font-semibold'>Launch Date</div>
                      <div>{data.launchDate}</div>
                    </div>
                    <div className='w-full flex items-center justify-between text-[10px]  md:text-[14px] text-[#4B5563] border-b-[0.25px] border-b-[#1F2937] pb-2'>
                      <div className='font-semibold'>Payload Type</div>
                      <div>{data.payloadType}</div>
                    </div>
                    <div className='w-full flex items-center justify-between text-[10px]  md:text-[14px] text-[#4B5563] border-b-[0.25px] border-b-[#1F2937] pb-2'>
                      <div className='font-semibold'>Orbit</div>
                      <div>{data.orbit}</div>
                    </div>
                    <div className='w-full flex items-center justify-between text-[10px]  md:text-[14px] text-[#4B5563]'>
                      <div className='font-semibold'>Launch Site</div>
                      <div>{data.launchSite}</div>
                    </div>
                    
                  </div>
                </div>
            </DialogContent>
        </Dialog>
    </div>
  )
}

export default LaunchModal