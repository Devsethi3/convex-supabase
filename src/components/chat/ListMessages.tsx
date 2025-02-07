"use client";

const ListMessages = () => {
  return (
    <>
      <div className="flex-1 flex flex-col p-5 overflow-y-auto">
        <div className="flex-1">
          <div className="space-y-5">
            {[1, 2, 3, 4, 5, 6].map((value) => {
              return (
                <div key={value} className="flex items-start gap-x-2">
                  <div className="h-9 w-9 rounded-full bg-emerald-500" />
                  <div className="flex-1">
                    <div className="flex items-center gap-x-2">
                      <p className="font-semibold">John Wick</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date().toDateString()}
                      </p>
                    </div>
                    <p className="opacity-80">
                      TEXT for display_name and avatar_url) Let me know if you
                      need to access different fields from the
                      raw_user_meta_data or if you need any other adjustments!
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ListMessages;
