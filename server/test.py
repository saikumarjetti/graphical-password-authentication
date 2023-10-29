import time
import hashlib
import resource
from itertools import permutations

FinalHash = "d617d91c5c5b9629aa303af00118338f1bbb6f574c3f406f8d0dd363e5373ade"
imagesList = [
    "uxqq6k9h5ORCJ.png",
    "zrc7jwW0GI3SM.png",
    "kwmB13dyP6922.png",
    "uxqho2yh0l5Ve.png",
    "uxqjMdMs9jn3F.png",
    "yaj4y7Zt63SQH.png",
    "pev5mQ4PutPQw.png",
    "uxqavvPuT7X35.png",
    "uxqumK2CUbNa5.png",
    "zrcMYq1rlOHng.png",
    "yajm9gvnBdhVh.png",
    "zrcpqwIJlybW3.png",
    "uxqTffVcdA3UN.png",
    "zrcWfbtiGLJ55.png",
    "uxqU0DGDFRUYU.png",
    "uxqCsOqu78fNV.png",
    "infmjGGc0DQHN.png",
    "ldoCYuVHFtWLb.png",
    "uxqjNAzEDD2Q8.png",
    "uxq40s58vkvz5.png",
    "uxqI3SVSPwIQU.png",
    "uxqqSGsBmhtjr.png",
    "uxqBkCpiDeYEM.png",
    "uxq2Tfw6ESRXN.png",
    "uxqt5LCVeoJJH.png",
]

allFilesHash = {
    "uxqq6k9h5ORCJ.png": "104ff54c2b55ffb9b1232aa3a092b1c20b551dc6829b68371a76c8886553d4e2",
    "zrc7jwW0GI3SM.png": "35982b54786f4ad0bfc61b2823dfdd2cd9c012202e7108071bc3ca735028118c",
    "kwmB13dyP6922.png": "01b82208f4dd9394feb88c16644bc60b9ea43d0898d10d1b10bd22f0f1926439",
    "uxqho2yh0l5Ve.png": "f433ba74ff3ebc05ff23f051f135051b2d596a03d6ed6725c620e5f5db644ceb",
    "uxqjMdMs9jn3F.png": "179a4437c5f3ca81f1baf7e1600b68a63319cb01111d77b10c9f1a2dac0c454c",
    "yaj4y7Zt63SQH.png": "ac531541c0440aa3f749a7fa238ee70ce9aedd5574b044dfce939f5f0250828a",
    "pev5mQ4PutPQw.png": "bdd8bb67d9306c807672ec72b83b715b9a43a1a7ecacdd1000898ef39006afb7",
    "uxqavvPuT7X35.png": "6fbeed3524f59a915d34192d4f310a843dccb61baa89808264bf3a1d583bd729",
    "uxqumK2CUbNa5.png": "2eb751e96561ac2780ec3148532cf19fff126561be0a4ceee82d1d5463e3d282",
    "zrcMYq1rlOHng.png": "f381da25101fcdc4780caa99d9638dac598371f7dc6d69f31abe8a7efca30d85",
    "yajm9gvnBdhVh.png": "428659b7fb11dae7e37255bd04ad406862219c7f42840e799ad4df5d936d035e",
    "zrcpqwIJlybW3.png": "6f99b9f53fbdc31a9e0ea4cfe6dd3f16a8d32d5d5b5df96a28ddebd39dd3962b",
    "uxqTffVcdA3UN.png": "78bbe5e9e2524a430d34469731dc8bdd2ef62eed03aacd5371a09f6c505c928f",
    "zrcWfbtiGLJ55.png": "463af6c1033d431807c3652e9f89bf18d869d1cb5f9bcfca21cbf73b84404f5a",
    "uxqU0DGDFRUYU.png": "b1a4ea4432378c0a4741947b14fca0432bf549a5e3eefb15c6fc28c5a10519bb",
    "uxqCsOqu78fNV.png": "0c98f5e4ec72b24d45cc93b486865d2ee4616e0b158f1f8374da0738cebd34e1",
    "infmjGGc0DQHN.png": "240e831200d68aa5a867094d099f0e6566030533b17bf29441cdc2ab7cea791d",
    "ldoCYuVHFtWLb.png": "1554b4205e08c48a04f9d5b4befcfc640846f7a8fe032b290ed789a37eed9d0e",
    "uxqjNAzEDD2Q8.png": "b3dc418d1065c1a5289467bb34469a8ba14b5dc122ac3c0c28e53576eef9353c",
    "uxq40s58vkvz5.png": "364f156fc06cf9f05dd437cf414f93cc20f4596fc551879559de9eb37f182ac7",
    "uxqI3SVSPwIQU.png": "374854082aa872ac495c1b3494a557914d2bbf4a29a29d951477748a934dd486",
    "uxqqSGsBmhtjr.png": "9812cdb98c6227d4407370fe08f3abc2ccdef21c9309bba23cf6f3c2b5c306f3",
    "uxqBkCpiDeYEM.png": "f51f56767350edd931115efa73d9f2b7a041f7ad19a9655068bb58c7a5491341",
    "uxq2Tfw6ESRXN.png": "e73c5fc43863630fd140aff69f9dcfa68b8fd0c4b53b46ec338b0724f59475f2",
    "uxqt5LCVeoJJH.png": "fd3abb15b5d02b198efcb827d34ca09ad20f91c773149291e3c0b194efe4376e",
}


solutionSequence = {
    0: "ldo1EhDfGteKi.png",
    1: "inf57AAbLazWx.png",
    2: "kwm65ggKjX2bH.png",
    3: "pev2ypIcZZlMM.png",
    4: "uxq2Tfw6ESRXN.png",
    5: "yaj3tKeAg8e1i.png",
}


def generate_permutations_without_repetition(arr, n):
    result = []

    def backtrack(current_perm, remaining_items):
        if len(current_perm) == n:
            result.append(list(current_perm))  # Found a valid permutation
            return
        for i in range(len(remaining_items)):
            current_perm.append(remaining_items[i])
            next_items = remaining_items[:i] + remaining_items[i+1:]
            backtrack(current_perm, next_items)
            current_perm.pop()  # Backtrack by removing the last added item
    backtrack([], arr)  # Start with an empty current permutation and all items
    return result


def hack():
    password_len = 5
    hash = {}
    # Step 2
    permutation_data = generate_permutations_without_repetition(
        list(allFilesHash.values()), password_len
    )
    # its hot from here 🔥 🥵
    total_no_of_tries = 0
    try_data = permutation_data
    start_time = time.time()
    flag = False

    for hash_list in try_data:
        computed_hash = hashlib.sha256("".join(hash_list).encode()).hexdigest()
        print(
            f"Computed Hash -> {computed_hash} Trying -> {total_no_of_tries}")
        if computed_hash == FinalHash:
            print(f"You made it")
            ans = {}
            for k, v in allFilesHash.items():
                if v in hash_list:
                    ans[hash_list.index(v)] = k
            for k, v in solutionSequence.items():
                if ans[k] != v:
                    print("Naaa its wrong sequence")
                    break
            print("🥲 😭 you found the sequence")
            print(ans)
            flag = True
            break
        total_no_of_tries += 1

    end_time = time.time()
    print(f"Execution Time: {end_time - start_time} seconds")
    # Memory usage
    memory_usage = resource.getrusage(resource.RUSAGE_SELF).ru_maxrss
    print(f"Memory Usage (in KB): {memory_usage}")
    if not flag:
        print(
            "All this math is just making my brain spin 😅, but haven't found the sequence")


hack()
