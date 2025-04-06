"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// const Developer = [
//   {
//     name: "Angga Islami Pasya",
//     role: "Backend Developer",
//     image: "/dev/angga.jpeg",
//     github: "https://github.com/AnggaaIs",
//   },
//   {
//     name: "Wahyu Pamungkas",
//     role: "UI / UX Designer",
//     image: "/dev/wahyu.jpeg",
//     github: "https://github.com/Devstore120",
//   },
//   {
//     name: "Christian Jeremy",
//     role: "Frontend Developer",
//     image: "/dev/jeremy.jpeg",
//     github: "https://github.com/jeremy776",
//   },
// ];

export default function Home() {
  const router = useRouter();
  const [templates, setTemplates] =
    useState<{ label: string; filename: string }[]>();

  useEffect(() => {
    fetch("/api/templates")
      .then((res) => res.json())
      .then((data) => setTemplates(data.data))
      .catch((err) => console.error("Error fetching templates:", err));
  }, []);

  return <>
    <div className="flex justify-center flex-col items-center px-10 pt-10 min-h-[80vh]">
      <div className="flex h-full flex-col gap-10 md:gap-0 md:flex-row justify-between items-center max-w-6xl md:p-5 rounded-xl w-full">
        <div className="w-full items-center md:items-start flex justify-center flex-col">
          <h1 className="md:text-5xl text-3xl text-center md:text-left font-semibold">Satu Klik, Foto Makin Aesthetic!</h1>
          <p className="text-md md:text-lg text-center md:text-left mt-2">
            Pilih template, ambil foto, dan bagikan hasilnya dalam sekejap!
          </p>

          <button
            onClick={() => {
              router.push("/templates");
            }}
            className="btn mt-4 btn-success w-full md:w-1/2 btn-wide"
          >
            Pilih bingkai
          </button>
        </div>
        <div className="hidden w-full md:flex items-center justify-center md:items-end md:justify-end">
          <div className="mt-10 md:mt-1 h-[350px] w-[300px] flex items-center justify-center relative">
            <Image
              className="absolute left-0 top-0 -rotate-12"
              src="/example/template1.png"
              alt="contoh"
              width={100}
              height={100}
            />
            <Image
              className="absolute left-16 top-14 -rotate-6"
              src="/example/template2.png"
              alt="contoh"
              width={100}
              height={100}
            />
            <Image
              className="absolute left-34 top-0 rotate-6"
              src="/example/template3.png"
              alt="contoh"
              width={100}
              height={100}
            />
            <Image
              className="absolute left-50 top-18 rotate-16"
              src="/example/template4.png"
              alt="contoh"
              width={100}
              height={100}
            />
          </div>
        </div>
      </div>
    </div>

    <section className="">
      <div className="py-8 lg:py-16 mx-auto max-w-screen-xl px-4">
        <div className="mb-10 lg:mb-16 text-center">
          <h2 className="text-2xl mb-1 md:font-extrabold font-semibold tracking-tight leading-tight text-center md:text-3xl">Kolaborasi yang Menginspirasi!</h2>
          <p className="text-base-content/80">Kami bekerja sama dengan berbagai mitra untuk menghadirkan pengalaman yang lebih seru dan kreatif bagi pengguna.</p>
        </div>
        <div className={'grid grid-cols-2 gap-8 text-gray-400 sm:gap-12 md:flex md:justify-center md:items-center md:flex-wrap dark:text-gray-400'}>
          <Link href="/" className="flex justify-center items-center">
            <svg className="h-14 hover:text-gray-900 dark:hover:text-white" viewBox="0 0 1082 239" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d={'M133.497 172.173C125.049 172.173 118.35 171.448 113.401 169.997C108.451 168.546 104.782 166.498 102.393 163.853C100.003 161.293 98.4246 158.264 97.6566 154.765C96.974 151.181 96.6326 147.341 96.6326 143.245C96.6326 136.418 96.8033 128.61 97.1446 119.821C97.5713 111.032 98.0833 101.602 98.6806 91.5331C99.3633 81.3784 100.089 70.8824 100.857 60.0451L124.153 62.3491C123.299 68.9198 122.531 75.6611 121.849 82.5731C121.251 89.3998 120.739 96.0558 120.313 102.541C119.886 109.026 119.545 114.914 119.289 120.205C119.033 125.496 118.819 129.933 118.649 133.517C118.563 137.016 118.521 139.277 118.521 140.301C118.521 143.288 118.862 145.549 119.545 147.085C120.227 148.536 121.593 149.517 123.641 150.029C125.689 150.541 128.675 150.797 132.601 150.797C137.55 150.797 143.139 150.498 149.369 149.901C155.598 149.218 161.913 148.237 168.313 146.957C174.713 145.677 180.558 144.141 185.849 142.349L190.841 164.365C185.038 165.816 178.766 167.138 172.025 168.333C165.369 169.528 158.713 170.466 152.057 171.149C145.401 171.832 139.214 172.173 133.497 172.173ZM231.683 172.941C225.283 172.941 219.48 171.277 214.275 167.949C209.069 164.706 204.931 160.312 201.859 154.765C198.872 149.133 197.379 142.861 197.379 135.949C197.379 129.464 198.573 123.618 200.963 118.413C203.352 113.122 206.595 108.6 210.691 104.845C214.872 101.09 219.608 98.2318 224.899 96.2691C230.189 94.2211 235.736 93.1971 241.539 93.1971C246.403 93.1971 251.181 93.8798 255.875 95.2451C256.216 93.4531 256.515 91.6611 256.771 89.8691L278.659 93.5811C278.061 95.2024 277.464 97.6344 276.867 100.877C276.269 104.12 275.757 107.746 275.331 111.757C274.989 115.768 274.691 119.778 274.435 123.789C274.179 127.8 274.051 131.426 274.051 134.669C274.051 137.314 274.221 139.917 274.563 142.477C274.989 144.952 275.843 147 277.123 148.621C278.403 150.157 280.365 150.925 283.011 150.925H284.803L281.603 173.197C275.971 173.197 271.32 172.216 267.651 170.253C263.981 168.376 261.037 165.816 258.819 162.573C255.149 166.669 250.968 169.4 246.275 170.765C241.581 172.216 236.717 172.941 231.683 172.941ZM218.371 138.509C218.797 142.605 220.461 145.89 223.363 148.365C226.349 150.754 230.104 151.949 234.627 151.949C238.979 151.949 242.605 150.797 245.507 148.493C248.408 146.104 250.797 142.861 252.675 138.765C252.589 137.4 252.547 135.992 252.547 134.541C252.547 131.554 252.632 128.482 252.803 125.325C252.973 122.168 253.187 119.053 253.443 115.981C249.859 114.616 246.104 113.933 242.179 113.933C237.571 113.933 233.432 114.872 229.763 116.749C226.179 118.541 223.363 121.058 221.315 124.301C219.267 127.544 218.243 131.298 218.243 135.565C218.243 136.077 218.243 136.589 218.243 137.101C218.243 137.613 218.285 138.082 218.371 138.509ZM295.749 172.941L292.549 156.173C293.658 155.746 294.981 155.362 296.517 155.021C299.162 153.314 302.191 151.053 305.605 148.237C309.103 145.336 312.687 142.178 316.357 138.765C320.026 135.352 323.567 131.981 326.981 128.653C330.394 125.24 333.381 122.168 335.941 119.437C338.501 116.706 340.378 114.573 341.573 113.037C341.999 112.44 342.298 112.013 342.469 111.757C342.639 111.416 342.725 111.202 342.725 111.117C342.725 111.202 342.127 111.245 340.933 111.245C339.738 111.245 338.671 111.245 337.733 111.245C334.661 111.245 330.906 111.501 326.469 112.013C322.117 112.44 317.423 113.122 312.389 114.061C307.354 115 302.319 116.28 297.285 117.901L293.445 97.2931C302.234 95.5864 310.597 94.3064 318.533 93.4531C326.554 92.5144 334.106 92.0451 341.189 92.0451C343.919 92.0451 346.821 92.1304 349.893 92.3011C353.05 92.4718 356.037 92.9838 358.853 93.8371C361.669 94.6051 363.973 95.9278 365.765 97.8051C367.557 99.5971 368.453 102.114 368.453 105.357C368.453 107.661 367.471 110.52 365.509 113.933C363.631 117.261 360.943 120.973 357.445 125.069C354.031 129.08 350.021 133.304 345.413 137.741C340.89 142.178 335.983 146.616 330.693 151.053C335.386 150.797 340.037 150.669 344.645 150.669C351.215 150.669 357.018 150.797 362.053 151.053C367.087 151.309 370.415 151.65 372.037 152.077L372.165 172.045C369.775 171.874 365.935 171.704 360.645 171.533C355.354 171.448 349.509 171.405 343.109 171.405C337.135 171.405 331.034 171.448 324.805 171.533C318.661 171.704 312.986 171.874 307.781 172.045C302.661 172.301 298.65 172.6 295.749 172.941ZM404.66 197.517L385.46 187.277C390.238 181.986 394.889 176.525 399.412 170.893C403.934 165.346 408.244 159.629 412.34 153.741C408.329 148.365 404.318 142.605 400.308 136.461C396.297 130.232 392.585 124.13 389.172 118.157C385.758 112.184 382.985 106.85 380.852 102.157L401.332 93.1971C402.868 97.2931 404.83 101.73 407.22 106.509C409.694 111.288 412.382 116.152 415.284 121.101C418.27 126.05 421.342 130.786 424.5 135.309C433.716 120.376 441.31 105.656 447.284 91.1491L468.532 99.5971C464.692 106.936 460.34 114.829 455.476 123.277C450.697 131.64 445.534 140.173 439.988 148.877C434.526 157.496 428.809 165.944 422.836 174.221C416.862 182.584 410.804 190.349 404.66 197.517ZM487.673 171.405C487.587 168.674 487.545 165.901 487.545 163.085C487.545 160.354 487.545 157.624 487.545 154.893C487.545 142.349 487.801 130.189 488.313 118.413C488.825 106.552 489.422 95.2451 490.105 84.4931C486.691 85.3464 483.833 86.1571 481.529 86.9251L476.537 66.4451C480.718 65.1651 485.113 64.0558 489.721 63.1171C494.414 62.0931 498.979 61.2824 503.417 60.6851C507.939 60.0024 512.078 59.5331 515.833 59.2771C519.673 58.9358 522.83 58.7651 525.305 58.7651C527.95 58.7651 531.193 58.9784 535.033 59.4051C538.958 59.8318 542.969 60.7278 547.065 62.0931C551.246 63.3731 555.129 65.3358 558.713 67.9811C562.297 70.6264 565.198 74.2104 567.417 78.7331C569.721 83.1704 570.873 88.7598 570.873 95.5011C570.873 102.498 569.337 108.344 566.265 113.037C563.193 117.645 559.139 121.357 554.105 124.173C549.07 126.904 543.523 128.866 537.465 130.061C531.406 131.256 525.433 131.853 519.545 131.853C515.79 131.853 512.206 131.682 508.793 131.341C508.707 135.437 508.665 139.49 508.665 143.501C508.665 148.962 508.707 154.04 508.793 158.733C508.878 163.341 509.049 167.394 509.305 170.893L487.673 171.405ZM524.665 79.7571C522.446 79.7571 520.142 79.8424 517.753 80.0131C515.449 80.1838 513.145 80.3971 510.841 80.6531C510.414 85.1758 510.073 90.0824 509.817 95.3731C509.561 100.664 509.347 106.082 509.177 111.629C512.334 111.885 515.619 112.013 519.033 112.013C539.513 112.013 549.753 105.954 549.753 93.8371C549.753 89.0584 547.705 85.5171 543.609 83.2131C539.513 80.9091 533.198 79.7571 524.665 79.7571ZM621.211 173.069C613.019 173.069 605.808 171.448 599.579 168.205C593.435 165.048 588.613 160.61 585.115 154.893C581.701 149.176 579.995 142.562 579.995 135.053C579.995 130.53 580.763 125.794 582.299 120.845C583.835 115.81 586.309 111.117 589.723 106.765C593.136 102.413 597.616 98.8718 603.163 96.1411C608.795 93.4104 615.621 92.0451 623.643 92.0451C629.445 92.0451 634.309 92.6851 638.235 93.9651C642.245 95.2451 645.488 96.9091 647.963 98.9571C650.523 101.005 652.443 103.181 653.723 105.485C655.088 107.789 655.984 110.008 656.411 112.141C656.923 114.189 657.179 115.896 657.179 117.261C657.179 125.538 653.68 131.938 646.683 136.461C639.771 140.898 629.957 143.117 617.243 143.117C614.341 143.117 611.568 142.989 608.923 142.733C606.363 142.477 603.973 142.178 601.755 141.837C603.376 146.104 606.064 149.261 609.819 151.309C613.573 153.272 617.456 154.253 621.467 154.253C627.269 154.253 632.389 153.229 636.827 151.181C641.264 149.048 645.445 145.805 649.371 141.453L660.763 157.837C658.032 160.056 654.96 162.36 651.547 164.749C648.219 167.138 644.123 169.101 639.259 170.637C634.395 172.258 628.379 173.069 621.211 173.069ZM624.027 111.245C618.992 111.245 614.555 112.525 610.715 115.085C606.875 117.645 604.059 121.016 602.267 125.197C604.4 125.538 606.491 125.837 608.539 126.093C610.672 126.264 612.763 126.349 614.811 126.349C616.688 126.349 618.821 126.178 621.211 125.837C623.685 125.496 626.075 124.984 628.379 124.301C630.768 123.618 632.731 122.765 634.267 121.741C635.803 120.632 636.571 119.352 636.571 117.901C636.571 117.218 636.229 116.365 635.547 115.341C634.864 114.317 633.627 113.378 631.835 112.525C630.043 111.672 627.44 111.245 624.027 111.245ZM708.696 173.325C701.869 173.325 695.896 172.216 690.776 169.997C685.741 167.778 681.56 164.749 678.232 160.909C674.904 156.984 672.429 152.504 670.808 147.469C669.186 142.434 668.376 137.144 668.376 131.597C668.376 125.965 669.357 120.76 671.32 115.981C673.368 111.117 676.141 106.893 679.64 103.309C683.224 99.7251 687.405 96.9518 692.184 94.9891C696.962 92.9411 702.168 91.9171 707.8 91.9171C713.688 91.9171 719.149 92.9411 724.184 94.9891C729.218 97.0371 733.613 99.8958 737.368 103.565C741.122 107.234 744.024 111.544 746.072 116.493C748.205 121.442 749.272 126.818 749.272 132.621C749.272 145.506 745.73 155.533 738.648 162.701C731.565 169.784 721.581 173.325 708.696 173.325ZM708.568 152.589C714.797 152.589 719.533 150.84 722.776 147.341C726.104 143.842 727.768 138.808 727.768 132.237C727.768 126.349 725.976 121.613 722.392 118.029C718.808 114.445 714.114 112.653 708.312 112.653C704.813 112.653 701.613 113.592 698.712 115.469C695.81 117.261 693.464 119.693 691.672 122.765C689.965 125.752 689.112 129.08 689.112 132.749C689.112 135.992 689.752 139.149 691.032 142.221C692.397 145.293 694.53 147.81 697.432 149.773C700.333 151.65 704.045 152.589 708.568 152.589ZM760.329 199.181C759.731 192.354 759.305 185.485 759.049 178.573C758.793 171.661 758.665 163.682 758.665 154.637C758.665 143.629 758.835 132.664 759.177 121.741C759.518 110.818 760.03 100.834 760.713 91.7891L782.729 92.4291C782.473 94.3918 782.259 96.4824 782.089 98.7011C785.161 96.6531 788.446 95.1598 791.945 94.2211C795.529 93.2824 799.155 92.8131 802.825 92.8131C807.518 92.8131 812.083 93.5811 816.521 95.1171C820.958 96.5678 824.969 98.9144 828.553 102.157C832.137 105.314 834.953 109.41 837.001 114.445C839.134 119.48 840.201 125.538 840.201 132.621C840.201 139.618 839.134 145.72 837.001 150.925C834.867 156.13 832.009 160.397 828.425 163.725C824.841 167.138 820.83 169.656 816.393 171.277C811.955 172.984 807.39 173.837 802.697 173.837C794.078 173.837 786.483 171.277 779.913 166.157C780.083 171.618 780.339 176.866 780.681 181.901C781.022 187.021 781.449 192.226 781.961 197.517L760.329 199.181ZM799.369 114.061C790.921 114.061 784.563 118.2 780.297 126.477C780.041 131.597 779.87 136.802 779.785 142.093C781.833 144.824 784.478 147.213 787.721 149.261C790.963 151.224 795.102 152.205 800.137 152.205C812.169 152.205 818.185 145.336 818.185 131.597C818.185 127.928 817.502 124.941 816.137 122.637C814.771 120.333 813.065 118.584 811.017 117.389C808.969 116.109 806.878 115.256 804.745 114.829C802.611 114.317 800.819 114.061 799.369 114.061ZM874.515 172.941C869.821 172.941 865.939 171.917 862.867 169.869C859.88 167.906 857.491 165.176 855.699 161.677C853.992 158.178 852.712 154.168 851.859 149.645C851.091 145.122 850.579 140.301 850.323 135.181C850.152 129.976 850.067 124.77 850.067 119.565C850.067 115.042 850.195 110.093 850.451 104.717C850.707 99.2558 851.005 93.7518 851.347 88.2051C851.773 82.5731 852.2 77.2824 852.627 72.3331C853.139 67.3838 853.608 63.0744 854.035 59.4051L877.203 59.6611C876.52 64.0131 875.88 68.9624 875.283 74.5091C874.685 79.9704 874.173 85.5171 873.747 91.1491C873.405 96.7811 873.107 101.986 872.851 106.765C872.68 111.544 872.595 115.341 872.595 118.157C872.595 125.922 872.723 132.024 872.979 136.461C873.32 140.898 873.789 144.056 874.387 145.933C875.069 147.725 875.965 148.621 877.075 148.621C878.525 148.621 880.104 147.725 881.811 145.933C883.517 144.056 885.181 141.965 886.803 139.661L897.683 161.293C895.037 164.194 891.88 166.84 888.211 169.229C884.541 171.704 879.976 172.941 874.515 172.941ZM947.336 173.069C939.144 173.069 931.933 171.448 925.704 168.205C919.56 165.048 914.738 160.61 911.24 154.893C907.826 149.176 906.12 142.562 906.12 135.053C906.12 130.53 906.888 125.794 908.424 120.845C909.96 115.81 912.434 111.117 915.848 106.765C919.261 102.413 923.741 98.8718 929.288 96.1411C934.92 93.4104 941.746 92.0451 949.768 92.0451C955.57 92.0451 960.434 92.6851 964.36 93.9651C968.37 95.2451 971.613 96.9091 974.088 98.9571C976.648 101.005 978.568 103.181 979.848 105.485C981.213 107.789 982.109 110.008 982.536 112.141C983.048 114.189 983.304 115.896 983.304 117.261C983.304 125.538 979.805 131.938 972.808 136.461C965.896 140.898 956.082 143.117 943.368 143.117C940.466 143.117 937.693 142.989 935.048 142.733C932.488 142.477 930.098 142.178 927.88 141.837C929.501 146.104 932.189 149.261 935.944 151.309C939.698 153.272 943.581 154.253 947.592 154.253C953.394 154.253 958.514 153.229 962.952 151.181C967.389 149.048 971.57 145.805 975.496 141.453L986.888 157.837C984.157 160.056 981.085 162.36 977.672 164.749C974.344 167.138 970.248 169.101 965.384 170.637C960.52 172.258 954.504 173.069 947.336 173.069ZM950.152 111.245C945.117 111.245 940.68 112.525 936.84 115.085C933 117.645 930.184 121.016 928.392 125.197C930.525 125.538 932.616 125.837 934.664 126.093C936.797 126.264 938.888 126.349 940.936 126.349C942.813 126.349 944.946 126.178 947.336 125.837C949.81 125.496 952.2 124.984 954.504 124.301C956.893 123.618 958.856 122.765 960.392 121.741C961.928 120.632 962.696 119.352 962.696 117.901C962.696 117.218 962.354 116.365 961.672 115.341C960.989 114.317 959.752 113.378 957.96 112.525C956.168 111.672 953.565 111.245 950.152 111.245Z'} />
            </svg>
          </Link>
          <Link href="https://teras48.com" className="flex justify-center items-center">
            <Image src={"https://teras48.com/images/teras-horizontal.svg"} className="mix-blend-luminosity grayscale brightness-100 contrast-75 hover:grayscale-0 hover:brightness-200 hover:contrast-100" alt="Teras48" width={250} height={30} />
          </Link>
        </div>
      </div>
    </section>

    <section className="flex flex-col items-center p-10 mt-15 bg-base-200 rounded-3xl">
      <div className="flex flex-col items-center max-w-5xl md:p-5 rounded-xl w-full">
        <div className="mb-16 lg:mb-16 text-center">
          <h2 className="text-2xl mb-1 md:font-extrabold font-semibold tracking-tight leading-tight text-center md:text-3xl">Pose ngawur, hasil tetap keren</h2>
          <p className="text-base-content/80">Kamu yang kaku depan kamera? Nggak masalah. Di PicaPop, asal jepret aja. Sisanya? Biar template lucu kami yang bantu kamu tampil memukau.</p>
        </div>
        <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
          <div>
            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300 lucide lucide-camera-icon lucide-camera" fill="none"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" /><circle cx="12" cy="13" r="3" /></svg>
            </div>
            <h3 className="mb-2 text-xl font-bold dark:text-white">Fotografi Instan</h3>
            <p className="text-gray-300">Ambil selfie langsung dari browser, pilih template, dan biarkan kreativitasmu bicara. Semua bisa dilakukan dalam hitungan detik.</p>
          </div>
          <div>
            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300 lucide lucide-palette-icon lucide-palette"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor" /><circle cx="17.5" cy="10.5" r=".5" fill="currentColor" /><circle cx="8.5" cy="7.5" r=".5" fill="currentColor" /><circle cx="6.5" cy="12.5" r=".5" fill="currentColor" /><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" /></svg>
            </div>
            <h3 className="mb-2 text-xl font-bold dark:text-white">Desain Kreatif</h3>
            <p className="text-gray-300">Jelajahi berbagai template unik dan bergaya. Dari yang minimalis sampai colorful – semua dirancang untuk membuat hasil fotomu makin standout.</p>
          </div>
          <div>
            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
              <svg className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd"></path><path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"></path></svg>
            </div>
            <h3 className="mb-2 text-xl font-bold dark:text-white">Pengalaman Personal</h3>
            <p className="text-gray-300">Setiap foto punya cerita. Kami bantu kamu untuk menjadikannya personal dan bermakna lewat fitur kustomisasi.</p>
          </div>
          <div>
            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300 lucide lucide-settings-icon lucide-settings "><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
            </div>
            <h3 className="mb-2 text-xl font-bold dark:text-white">Otomatisasi Simpel</h3>
            <p className="text-gray-300">Dari pengambilan foto hingga penyimpanan – semuanya otomatis dan mudah, tanpa ribet.</p>
          </div>
          <div>
            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300 lucide lucide-save-all-icon lucide-save-all"><path d="M10 2v3a1 1 0 0 0 1 1h5"/><path d="M18 18v-6a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6"/><path d="M18 22H4a2 2 0 0 1-2-2V6"/><path d="M8 18a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9.172a2 2 0 0 1 1.414.586l2.828 2.828A2 2 0 0 1 22 6.828V16a2 2 0 0 1-2.01 2z"/></svg>
            </div>
            <h3 className="mb-2 text-xl font-bold dark:text-white">Simpan & Bagikan</h3>
            <p className="text-gray-300">Unduh hasil fotomu dalam format berkualitas tinggi atau langsung bagikan ke media sosial favoritmu.</p>
          </div>
          <div>
            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300 lucide lucide-brain-icon lucide-brain"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/><path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/><path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"/><path d="M3.477 10.896a4 4 0 0 1 .585-.396"/><path d="M19.938 10.5a4 4 0 0 1 .585.396"/><path d="M6 18a4 4 0 0 1-1.967-.516"/><path d="M19.967 17.484A4 4 0 0 1 18 18"/></svg>
            </div>
            <h3 className="mb-2 text-xl font-bold dark:text-white">Tim Kolaboratif</h3>
            <p className="text-gray-300">Bekerja bareng teman, tim, atau komunitas? Kami bantu permudah kolaborasi untuk proyek kreatif kamu.</p>
          </div>
        </div>
      </div>
    </section>

    <div className="flex flex-col items-center p-10 mt-20 rounded-3xl">
      <div className="flex flex-col items-center max-w-2xl md:p-5 rounded-xl w-full">
        <h1 className="text-center text-4xl font-semibold">Template Foto</h1>
        <p className="text-center text-base">
          Kami menyediakan beberapa template foto yang bisa kamu gunakan
        </p>
        <div className="mt-10 place-content-around w-[100%] grid grid-cols-2 md:grid-cols-4 gap-4">
          {templates?.slice(0, 4).map((template, index) => (
            <div
              key={index}
              className="items-center p-2 flex-col justify-center flex w-full hover:bg-primary/40 transition-all ease hover:py-4 rounded-xl"
            >
              <p className="mb-2 text-center">{template.label}</p>
              <Image
                className="rounded-md"
                src={`/template/${template.filename}`}
                alt={`${template.label}`}
                width={100}
                height={100}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
    <div className="relative w-full mb-2">
      <div className="left-0 h-[350px] -top-45 w-full items-center justify-center flex from-base-100 via-base-100 bg-gradient-to-t to-transparent absolute">
        <button
          className="btn btn-success btn-wide"
          onClick={() => {
            router.push("/templates");
          }}
        >
          Lihat semua template
        </button>
      </div>
    </div>

    <div className="mt-64"></div>

    {/* <div className="flex flex-col items-center px-2 mt-20">
      <div className="flex flex-col items-center max-w-7xl md:p-5 rounded-xl w-full">
        <section className="body-font w-full">
          <div className="container py-25">
            <div className="flex flex-col text-center w-full mb-10">
              <h3 className="text-center text-4xl font-semibold">Tim Kami</h3>
              <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                Kerja bareng, bikin solusi, selesai bersama
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-4">
              {Developer.map((dev) => (
                <div key={dev.name} className="p-2 w-full">
                  <div className="shadow-sm h-full flex items-center border-secondary/90 border p-4 rounded-2xl">
                    <Image
                      alt="team"
                      width={50}
                      height={50}
                      className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                      src={dev.image}
                    />
                    <div className="flex-grow">
                      <h2 className="title-font font-medium text-bold">
                        {dev.name}
                      </h2>
                      <p className="text-sm text-accent">{dev.role}</p>
                      <a
                        href={dev.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm"
                      >
                        GitHub
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div> */}

  </>;
}
