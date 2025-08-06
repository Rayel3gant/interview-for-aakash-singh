import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { singleLaunch } from "@/lib/types";
import { Loader } from "./Loader";
import { LaunchModalText } from "./LaunchModalText";

export const LaunchModal = ({
  setOpenModal,
  data,
  openModal,
  modalDataLoading,
}: {
  setOpenModal: (open: boolean) => void;
  data: singleLaunch;
  openModal: boolean;
  modalDataLoading: boolean;
}) => {
  return (
    <div>
      <Dialog onOpenChange={setOpenModal} open={openModal}>
        <DialogContent className="bg-white border-0 w-11/12 md:w-[600px] py-8">
          {modalDataLoading ? (
            <div className="flex justify-center items-center w-full py-20 h-full">
              <Loader />
            </div>
          ) : (
            <div className="bg-white w-11/12 mx-auto">
              <div className="flex gap-x-4 ">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={data.image} alt="iamge" width={72} height={72} />
                <div>
                  <div className="flex gap-x-2 items-center">
                    <div className="text-[#1F2937] uppercase font-semibold text-sm md:text-lg">
                      {data.name}
                    </div>
                    <div>{data.success}</div>
                  </div>

                  <div className="text-[#374151] text-xs">{data.rocket}</div>
                </div>

                <div>
                  {data.upcoming && (
                    <span className="bg-[#FEF3C7] text-[#92400F] rounded-[20px] text-xs px-3 py-1 inline-block">
                      Upcoming
                    </span>
                  )}
                  {data.success === true && !data.upcoming && (
                    <span className="bg-[#DEF7EC] text-[#03543F] rounded-[20px] text-xs px-3 py-1 inline-block">
                      Success
                    </span>
                  )}
                  {data.success === false && !data.upcoming && (
                    <span className="bg-[#FDE2E1] text-[#981B1C] rounded-[20px] text-xs px-3 py-1 inline-block">
                      Failed
                    </span>
                  )}
                </div>
              </div>

              <div className="text-[#1F2937] text-xs md:text-[14px] mt-6">
                {data.details}
                <a href={data.wikipedia} className="text-blue-600">
                  Wikipedia
                </a>
              </div>

              <div className="flex flex-col gap-y-3 mt-4">
                <LaunchModalText
                  label="Flight Number"
                  text={data.flightNumber}
                />
                <LaunchModalText label="Mission Name" text={data.name} />
                <LaunchModalText label="Rocket Type" text={data.rocketType} />
                <LaunchModalText label="Rocket Name" text={data.rocket} />
                <LaunchModalText
                  label="Manufacturer"
                  text={data.manufacturer}
                />
                <LaunchModalText label="Nationality" text={data.nationality} />
                <LaunchModalText label="Launch Date" text={data.launchDate} />
                <LaunchModalText label="Payload Type" text={data.payloadType} />
                <LaunchModalText label="Orbit" text={data.orbit} />
                <LaunchModalText label="Launch Site" text={data.launchSite} />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
