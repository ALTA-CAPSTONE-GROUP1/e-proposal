/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";
import axios from "axios";
import * as z from "zod";

import { LayoutAdmin } from "@/components/Layout";
import { OfficeData } from "@/utils/types/Admin";
import { RedButton } from "@/components/Button";
import { TabOffice } from "@/components/Tab";
import { Input } from "@/components/Input";
import { TableOffice } from "@/components/Table";
import { useCookies } from "react-cookie";

const schema = z.object({
  name: z.string(),
});

type Schema = z.infer<typeof schema>;

export const Office: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [officeData, setOfficeData] = useState<OfficeData[]>([]);
  const [cookie] = useCookies(["token", "user_position"]);

  const { setValue, register, handleSubmit } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Schema> = (data) => {
    setLoading(true);
    axios
      .post("office", data, {
        headers: {
          Authorization: `Bearer ${cookie.token}`,
        },
      })
      .then((res) => {
        const { message } = res.data;
        Swal.fire({
          title: "Success",
          text: message,
          showCancelButton: false,
        }).then((result) => {
          if (result.isConfirmed) {
            setValue("name", "");
          }
        });
      })
      .catch((error) => {
        const { message } = error.response.data;
        Swal.fire({
          title: "Failed",
          text: message,
          showCancelButton: false,
        });
      })
      .finally(() => setLoading(false))
      .finally(() => {
        fetchDataOffices();
      });
  };
  useEffect(() => {
    fetchDataOffices();
  }, []);
  const fetchDataOffices = async () => {
    axios
      .get("office", {
        headers: {
          Authorization: `Bearer ${cookie.token}`,
        },
      })
      .then((response) => {
        const { data } = response.data;
        setOfficeData(data);
      })
      .catch((error) => {
        alert(error.toString());
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDelete = (id: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover your account!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`office?id=${id}`, {
            headers: {
              Authorization: `Bearer ${cookie.token}`,
            },
          })
          .then((response) => {
            const { message } = response.data;
            Swal.fire({
              icon: "success",
              title: "Success",
              text: message,
              showCancelButton: false,
            }).finally(fetchDataOffices);
          })
          .catch((error) => {
            const { data } = error.response;
            Swal.fire({
              icon: "error",
              title: "Failed",
              text: data.message,
              showCancelButton: false,
            });
          });
      }
    });
  };

  return (
    <LayoutAdmin>
      <div
        className="max-w-[85rem] w-full mx-auto bg-white"
        aria-label="Global"
      >
        <TabOffice />
        <form
          className="flex flex-col p-4 bg-white rounded-md "
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mt-3">
            <h3 className="font-bold text-2xl text-black">Add Office</h3>
            <h3 className="text-sm">
              The office determines the place or location of work
            </h3>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <div className="mt-5 w-full">
                <label className="font-semibold text-md text-black">
                  Office
                </label>
                <Input
                  register={register}
                  name="name"
                  placeholder="Enter Office Location"
                  id="input-office-location"
                />
              </div>
              <div className="mt-5 md:mt-10 w-full md:w-40">
                <RedButton
                  label="+ Add"
                  id="button-add-office-location"
                  type="submit"
                  disabled={loading}
                />
              </div>
            </div>
          </div>
        </form>

        <div className="overflow-x-auto w-full p-6 mt-20 hidden md:block">
          {officeData ? (
            <TableOffice
              data={officeData}
              onClickDelete={(id) => handleDelete(id)}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </LayoutAdmin>
  );
};
